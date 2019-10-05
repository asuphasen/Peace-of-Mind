import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { TipsDataService } from '../service/tips-data.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.5,
  };

  items = [];
  tips: any = []

  funs = [];

  music_name = {
    title: '',
    content: ''
  };

  video_name = {
    title: '',
    url: '',
    img: ''
  }

  ionViewWillEnter() {
    this.fireService.getTips(result => {
      console.log(result)
      this.tips = result;
      this.items = [
        { img: './assets/icon/brain-in-head.svg', text: 'วิธีจัดการกับความเครียด' },
        { img: './assets/icon/sleepy.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน' },
      ]
      this.funs = [
        { img: './assets/icon/love-song.svg', text: 'เพลงฝึกสมาธิสำหรับผู้เริ่มต้นผ่อนคลายง่าย เข้าถึงสมาธิ', path: 'playlist' },
        { img: './assets/icon/lotus-position.svg', text: 'คลิปวิดีโอโยคะฝึกสมาธิง่ายๆ สำหรับผู้เริ่มต้น', path: 'video-playlist' },
      ]
    })
  }

  constructor(private router: Router,
    private alertCtrl: AlertController,
    private fireService: FireserviceService,
    private tipService: TipsDataService
  ) { }

  ngOnInit() {
    
  }
  async gotoLogin() {
    // this.router.navigate(['login']);
    let alert = await this.alertCtrl.create({
      header: 'แจ้งเตือน',
      message: 'ยืนยันการออกจากระบบ',
      mode: 'ios',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            this.fireService.logOut();

          }
        }
      ]
    });

    await alert.present();
  }

  gotoEvaluation() {
    this.router.navigate(['evaluation']);
  }

  gotoDetails(item) {
    // let obj = JSON.stringify(item)
    this.tipService.data = item;
    this.router.navigate(['detail-news']);

  }

  gotoPlaylist(path) {
    console.log(path)
    this.router.navigate([path]);
  }

  gotoVideoPlaylist() {
    this.router.navigate(['video-playlist']);
  }


  gotoDoctorList() {
    this.router.navigate(['doctor-list']);
  }

  addTips() {
    this.fireService.inputTips(this.music_name);
    this.music_name.title = "";
    this.music_name.content = "";
  }
  addVideo() {
    this.fireService.inputVideo(this.video_name);
    this.video_name.title = '';
    this.video_name.img = '';
    this.video_name.url = ''
  }

}
