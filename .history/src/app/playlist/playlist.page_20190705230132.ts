import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  items = [
    {img: './assets/icon/play-button.svg', text: 'TRACK01'},
    {img: './assets/icon/play-button.svg', text: 'TRACK02'},
    {img: './assets/icon/play-button.svg', text: 'TRACK03'},
    {img: './assets/icon/play-button.svg', text: 'TRACK04'},
    {img: './assets/icon/play-button.svg', text: 'TRACK05'},
   ];

  constructor() { }

  ngOnInit() {
  }

  back() {
    this
  }

}
