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
    {title: 'Notatka 1', description: 'Opis notatki 1'},
    {title: 'Notatka 2', description: 'Opis notatki 2'},
    {title: 'Notatka 3', description: 'Opis notatki 3'}
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
