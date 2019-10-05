import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  score: number;
  score_text: string;
  result_text: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private ngZone: NgZone) {

  }
  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.ngZone.run(() => {
          this.score = JSON.parse(params.score);
        })
      }
    });
    console.log(this.score);
    this.ngZone.run(() => {
      if (this.score < 7) {
        this.score_text = "น้อยกว่า 7 คะแนน";
        this.result_text = "ไม่มีอาการของโรคซึมเศ้ราหรือมีอาการของโรคซึมเศร้าระดับน้อยมาก";
      }
      else if (this.score >= 7 && this.score <= 12) {
        this.score_text = "7 - 12 คะแนน";
        this.result_text = "มีอาการของโรคซึมเศร้า ระดับน้อย";
      }
      else if (this.score >= 13 && this.score <= 18) {
        this.score_text = "13 - 18 คะแนน";
        this.result_text = "มีอาการของโรคซึมเศร้า ระดับปานกลาง";
      }
      else if (this.score > 18) {
        this.score_text = "ตั้งแต่ 19 คะแนนขึ้นไป";
        this.result_text = "มีอาการของโรคซึมเศร้า ระดับรุนแรง";
      }
    })

  }
  ngOnInit() {

  }

  gotoHello() {
    this.navCtrl.navigateBack(['hello'])
  }

}
