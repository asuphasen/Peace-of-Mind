import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../model/index'
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(
    private afd: AngularFireDatabase,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router,
    public toastController: ToastController
  ) { }

  createUser(user: User, password: string) {
    this.auth.auth.createUserWithEmailAndPassword(user.email, password).then((result) => {
      console.log(result.user.uid);
      this.afd.database.ref(`user/${result.user.uid}`).set(user);
    }).catch(error => {
      console.log(error.code)
    });

  }

  async login(email, password) {
    try {
      this.loadingPresent();
      console.log("loading persented")
      let result = await this.auth.auth.signInWithEmailAndPassword(email, password);
      console.log("result--> ", result)
      if (result) {
        console.log("Successfully logged in!");
        this.loadingDismiss();
        this.navCtrl.navigateRoot(['hello']);
      }
    } catch (error) {
      console.log(error)
      this.loadingDismiss();
      this.presentToast();
    }
  }

  logOut() {
    this.auth.auth.signOut();
    localStorage.clear();
    this.navCtrl.navigateRoot('login',{ skipLocationChange: true });
  }

  async loadingPresent() {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      mode: 'ios',
      message: `
      <div>
        <div class="heart-loader"></div>
      </div>
      `,
      // translucent: true,
      cssClass: 'loading'
    });
    await loading.present();
  }

  loadingDismiss() {
    this.loadingCtrl.dismiss();
  }

  inputMusic(name) {
    this.afd.database.ref('music').push(name);
  }
  inputTips(name) {
    this.afd.database.ref('Tips').push(name);
  }
  inputVideo(name) {
    this.afd.database.ref('Video').push(name);
  }


  getMusic(callBack) {
    this.afd.list('music').valueChanges().subscribe(snapshotChanges => {
      console.log(snapshotChanges)
      callBack(snapshotChanges)
    })
  }
  getVideo(callBack) {
    this.afd.list('Video').valueChanges().subscribe(snapshotChanges => {
      console.log(snapshotChanges)
      callBack(snapshotChanges)
    })
  }
  getTips(callBack) {
    this.afd.list('Tips').valueChanges().subscribe(snapshotChanges => {
      console.log(snapshotChanges)
      callBack(snapshotChanges)
    })
  }

  getDoctorList() {
    return this.afd.list('doctor').valueChanges()
  }

  getDataUser(callback) {
    this.auth.authState.subscribe(user => {
      if (user) {
        console.log("userrrrr",user)
        this.afd.database.ref(`user/${user.uid}`).once('value', snap => {
          callback(snap.val())
        })
      }
    })
  }

  review(doctor_id, comment, ratting, success, error) {
    // this.auth.auth.signInWithEmailAndPassword('moce@email.com','123456')
    this.auth.authState.subscribe(user => {
      if (user) {
        this.getDataUser(userdata => {
          console.log("userdata -----------> ",userdata)
          this.afd.database.ref(`doctor/${doctor_id}/review/${user.uid}`).set({
            comment: comment,
            rate: ratting,
            ...userdata
          }).then(() => {
            success(true)
          }).catch(err => {
            error(err)
          })
        })

      } else {
        error("premission authentication")
      }
    },e=>{
      error("authState")
    })
  }

  getReview(doctor_id, callback) {
    this.afd.list(`doctor/${doctor_id}/review`).valueChanges().subscribe(data => {
      console.log("firebase service----- ",data)
      callback(data)
    },err=>{
      callback(null)
    })
  }

  updateRating(doctor_id, new_rate){
    this.afd.database.ref(`doctor/${doctor_id}/average_rate`).set(new_rate)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      duration: 2000
    });
    toast.present();
  }
}
