import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  comment: string;
  rate: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onModelChange(ev) {
    console.log(ev)
  }

  dismiss() {
    this.modalCtrl.dismiss({ comment: "", rate: "", status: false })
  }
  dismissWithDataBack() {
    this.modalCtrl.dismiss({ comment: this.comment, rate: this.rate, status: true })
  }

  addReview() {
    // this.fireService.review()
  }

}
