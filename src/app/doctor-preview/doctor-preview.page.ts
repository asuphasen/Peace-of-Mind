import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { RatingPage } from './rating/rating.page';
import { FireserviceService } from '../fireservice.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { DoctorDataService } from '../service/doctor-data.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-doctor-preview',
  templateUrl: './doctor-preview.page.html',
  styleUrls: ['./doctor-preview.page.scss'],
})
export class DoctorPreviewPage implements OnInit {
  rate: number = 0;
  doctor_id: string;
  doctor_detail: any = {};
  reviewList: any = [];
  uid: any;
  username: any;
  total_rate: number = 0;
  new_rate: number = 0;

  items = [
    { img: './assets/icon/user-blue.svg', name: 'สมศรี ใจดี', time: '3 วันที่ผ่านมา', text: 'คุณหมอใจดีและให้คำแนะนำดีมากเลยคะ' },
    { img: './assets/icon/user-blue.svg', name: 'นวดี ความงาม', time: '7 วันที่ผ่านมา', text: 'ขอบคุณคุณหมอมากเลยคะ ตอนนี้สบายใจขึ้นเยอะเลยค่ะ' },
  ];

  constructor(private router: Router,
    private navCtr: NavController,
    private modalCtrl: ModalController,
    private fireService: FireserviceService,
    private auth: AngularFireAuth,
    private doctorData: DoctorDataService,
    private afd: AngularFireDatabase,
    private loadingController: LoadingController,
  ) { }
  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present()
    this.doctor_id = this.doctorData.data.doctor_id;

    this.afd.database.ref(`doctor/${this.doctor_id}`).once('value', data => {
      this.doctor_detail = data.val();
      this.fireService.getReview(this.doctor_id, data => {
        this.new_rate=0;
        this.total_rate=0;
        this.rate=0;
        if (data.length != 0) {
          this.reviewList = data;
          for (let i in this.reviewList) {
            this.total_rate += this.reviewList[i].rate;
          }
          this.new_rate = this.total_rate / this.reviewList.length;
          this.fireService.updateRating(this.doctor_id, this.new_rate);
          this.afd.database.ref(`doctor/${this.doctor_id}`).once('value', data => {
            // this.loadingController.dismiss()
            loading.dismiss()
            this.doctor_detail = data.val();

          }, err => {
            // this.loadingController.dismiss()
            loading.dismiss()
          });
        } else {
          // this.loadsingController.dismiss()
          loading.dismiss()
        }
      });
    }, err => {
      console.log("error ", err)
    });
  }
  ngOnInit() {
    // this.presentLoadingWithOptions()

  }

  back() {
    // this.router.navigate(['hello']);
    this.navCtr.navigateRoot(['hello'])
  }

  gotoChat() {
    let name = this.doctor_detail.titlename + this.doctor_detail.firstname + ' ' + this.doctor_detail.lastname;
    this.router.navigate(['chat'], { queryParams: { name: name } });
  }

  async popupRating() {
    let modal = await this.modalCtrl.create({
      component: RatingPage,
      cssClass: 'modalRating'
    })
    modal.onDidDismiss().then(dataBack => {
      if (dataBack.data.status) {
        this.total_rate = 0;
        console.log(dataBack)
        // console.log("current rate -+-" + this.doctor_detail.average_rate)
        this.new_rate = (this.doctor_detail.average_rate + this.rate) / this.reviewList.length;
        console.log('new rate==>', this.new_rate)
        this.new_rate = this.new_rate ? this.new_rate : 0;
        this.fireService.updateRating(this.doctor_detail.doctor_id, this.new_rate)
        this.fireService.review(this.doctor_detail.doctor_id, dataBack.data.comment, dataBack.data.rate, s => {
          console.log('sssssssss', s)
        }, e => {
          console.log('eeeeeeeeeee', e)
        })
      } else {

      }
    })

    return await modal.present()

  }

  arrayOne(n: number): any[] {
    return Array(Math.floor(n));
  }

  getStarHalf(n) {
    let Int = Math.floor(n);
    if ((n - Int) > 0.3) {
      return true;
    }
    else {
      return false;
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
