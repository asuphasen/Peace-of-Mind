import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {
  tab = [false, false, false, false, false, false]
  score: any;
  count: number = 0;

  eva_item = []


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController,
    private ngZone: NgZone
  ) { }

  ionViewWillEnter() {
    this.ngZone.run(() => {
      this.eva_item = [
        {
          item: { text: 'เบื่อ ไม่สนใจอยากทำอะไร', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'ไม่สบายใจ ซึมเศร้า ท้อแท้', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'เหนื่อยง่าย หรือไม่ค่อยมีแรง', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'เบื่ออาหาร หรือกินมากเกินไป', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตนเองหรือครอบครัวผิดหวัง', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        },
        {
          item: { text: 'คิดทำร้ายตัวเอง หรือคิดว่าถ้าตายไปคงจะดี', active: false },
          op1: { text: 'ไม่มีเลย', status: false },
          op2: { text: 'เป็นบางวัน', status: false },
          op3: { text: 'เป็นบ่อย', status: false },
          op4: { text: 'เป็นทุกวัน', status: false }
        }
      ]
    })
  }

  ngOnInit() {

  }

  back() {
    // this.router.navigate(['hello']);
    this.navCtrl.back()
  }

  // gotoResult() {
  //   this.router.navigate(['result'], { queryParams: { score: this.score } })
  // }

  switchCheck(item, option) {
    for (let i in this.eva_item[item]) {
      if (i != 'item') {
        this.eva_item[item][i].status = false;
      }
    }
    let key = 'op' + (option).toString();
    this.eva_item[item][key].status = true;
    this.calScore()
    this.eva_item[item]['item'].active = true;
    console.log(this.eva_item[item]['item'].active)
  }

  switchTab(i) {
    if (this.tab[i] == true) {
      setTimeout(() => {
        this.tab[i] = false
      }, 100)
    } else {
      for (let j = 0; j < this.eva_item.length; j++) {
        this.tab[j] = false;
      }
      this.tab[i] = true;
    }
  }

  calScore() {
    this.score = 0
    for (let i in this.eva_item) {
      for (let j in this.eva_item[i]) {
        if (j != 'item') {
          if (this.eva_item[i][j].status) {
            let num = parseInt(j[2]);
            this.score += num - 1;
            console.log(this.score);
          }
        }
      }
    }
  }

  async confirm() {
    this.count = 0;
    for (let i in this.eva_item) {
      for (let j in this.eva_item[i]) {
        if (j != 'item') {
          if (this.eva_item[i][j].status) {
            this.count++;
            console.log('----------------> ' + this.count);
          }
        }
      }
    }
    if (this.score == undefined || this.count != 9) {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'กรุณาทำแบบสอบถามให้ครบ !',
        mode: 'ios',
        buttons: ['ตกลง']
      });
      alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'คุณต้องการส่งแบบสอบถามใช่หรือไม่',
        mode: 'ios',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ยืนยัน',
            handler: () => {
              console.log('Confirm Okay', this.score);
              this.router.navigate(['result'], { queryParams: { score: this.score } });
            }
          }
        ]
      })
      alert.present();
    }
  }

}
