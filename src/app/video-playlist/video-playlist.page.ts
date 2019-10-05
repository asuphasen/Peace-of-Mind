import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { FireserviceService } from '../fireservice.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.page.html',
  styleUrls: ['./video-playlist.page.scss'],
})
export class VideoPlaylistPage implements OnInit {

  images_top = [
    './assets/yoga.jpeg',
    './assets/yoga2.jpg',
    './assets/yoga3.jpg',
    './assets/yoga4.jpg',
    './assets/yoga5.jpeg'
  ]
  list_lenght: any;

  slidesOpts = {
    loop: true,
    autoplay: true,
    speed: 1000,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  items: any = [];

  constructor(
    private navCtrl: NavController,
    private streamingMedia: StreamingMedia,
    private fireService: FireserviceService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present()
    this.fireService.getVideo(result => {
      console.log(result)
      this.items = result;
      this.list_lenght = this.items.length;
      loading.dismiss()
    })

  }

  back() {
    this.navCtrl.back()
  }

  playVideo(url) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error streaming') },
      orientation: 'portrait',
      shouldAutoClose: false,
      controls: true
    };
    this.streamingMedia.playVideo(url, options)
  }

}
