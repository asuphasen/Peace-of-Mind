import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true,
    slidesPerView: 1.5,
    spaceBetween: 1,
  };

  items = [
    {img: './assets/icon/brain-in-head.svg', number: '1'},
    {img: './assets/icon/sleepy.svg', number: '2'},
   ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoLogin(){
    this.router.navigate(['login']);
  }

  gotoEvaluation(){
    this.router.navigate(['evaluation']);
  }

}
