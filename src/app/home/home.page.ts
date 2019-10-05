import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,
    private navCtrl: NavController) { }

  async gotoLogin() {
    this.navCtrl.navigateForward(['login'])
    
  }
  gotoRegister() {
    this.navCtrl.navigateForward(['register']);
  }
}
