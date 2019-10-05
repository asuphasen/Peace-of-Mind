import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  items = [
    {img: './assets/icon/brain-in-head.svg', text: 'วิธีจัดการกับความเครียด'},
    {img: './assets/icon/sleepy.svg', text: 'ทำไมคนเราต้องนอน 6-8 ชั่วโมงต่อวัน'},
   ];
   
  constructor() { }

  ngOnInit() {
  }

}
