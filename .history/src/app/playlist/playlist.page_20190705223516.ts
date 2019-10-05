import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  items = [
    {img: './assets/icon/play-button.svg', text: 'TRA'},
    {img: './assets/icon/play-button.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน'},
    {img: './assets/icon/play-button.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน'},
    {img: './assets/icon/play-button.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน'},
    {img: './assets/icon/play-button.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน'},
   ];

  constructor() { }

  ngOnInit() {
  }

}
