import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.page.html',
  styleUrls: ['./detail-news.page.scss'],
})
export class DetailNewsPage implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['hello'])
  }
}
