import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TipsDataService } from '../service/tips-data.service';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.page.html',
  styleUrls: ['./detail-news.page.scss'],
})
export class DetailNewsPage implements OnInit {

  data: any = {};

  constructor(private router: Router,
    private navCtr: NavController,
    private tipService: TipsDataService,
    private fireService: FireserviceService
  ) {

  }

  ngOnInit() {
    this.fireService.loadingPresent()
    setTimeout(() => {
      this.data = this.tipService.data;
      this.fireService.loadingDismiss()
    },1000)

    console.log(this.data)
  }

  back() {
    // this.router.navigate(['hello']);
    this.navCtr.back()
  }
}
