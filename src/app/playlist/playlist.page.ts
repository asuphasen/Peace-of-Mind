import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FireserviceService } from '../fireservice.service';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.page.html",
  styleUrls: ["./playlist.page.scss"]
})
export class PlaylistPage implements OnInit {
  button = []
  items: any = []

  constructor(private router: Router,
    private fireService: FireserviceService,
    private streamingMedia: StreamingMedia,
    private loadingController: LoadingController) { }

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present()
    this.fireService.getMusic(result => {
      console.log(result)
      this.items = result;
      loading.dismiss()
    })
  }
  ngOnInit() {

  }

  back() {
    this.router.navigate(['hello']);
  }

  switchButton(num) {
    for (let i = 0; i < this.button.length; i++) {
      if (i != num) {
        this.button[i] = false;
      }
    }
    this.button[num] = !this.button[num];
  }

  playAudio(url) {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error streaming') },
      initFullscreen: false
    };
    this.streamingMedia.playAudio(url, options)
  }
}
