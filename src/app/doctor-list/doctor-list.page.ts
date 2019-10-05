import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { DoctorDataService } from '../service/doctor-data.service';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.page.html',
  styleUrls: ['./doctor-list.page.scss'],
})
export class DoctorListPage implements OnInit {
  doctors = []

  constructor(private router: Router,
    private navCtr: NavController,
    private fireService: FireserviceService,
    private loadingController: LoadingController,
    private doctorData: DoctorDataService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    // this.presentLoadingWithOptions()
    
  }

  
  ionViewDidEnter(){
    console.log('docket list')
    this.getdata();
  }
  async getdata(){
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present()
    this.fireService.getDoctorList().subscribe(data=>{
      this.doctors = data;
      console.log(data)
      loading.dismiss();
    },error=>{
      console.log(error)
      loading.dismiss();
    })

  }
  // call(){
  //   this.ngZone.run(() => {
  //     this.getdata()
  //   })
  // }

  back() {
    this.navCtr.navigateBack(['hello'])
  }

  gotoDoctorPreview(doctor) {
    this.doctorData.data = doctor;
    this.router.navigate(['doctor-preview']);
  }

  arrayOne(n: number): any[] {
    let Int = Math.floor(n);
    return Array(Int);
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
