import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };
  constructor() { }

  ngOnInit() {
  }

}
