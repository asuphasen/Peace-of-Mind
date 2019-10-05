import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { User } from 'src/model/index';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  firstname;
  lastname;
  phone_number;
  gender;
  bloodType;
  birthday;

  constructor(
    private router: Router,
    private fireService: FireserviceService,
    private navCtrl: NavController) {
    // this.email = 'test@gmail.com'
    // this.password = '123456'
  }

  ngOnInit() {
  }

  checkLogin() {
    if (this.email && this.password) {
      this.fireService.login(this.email, this.password)
    } else {
      
    }
  }

  back() {
    this.router.navigate(['home']);
  }

  gotoHello() {
    this.router.navigate(['hello']);
  }

}
