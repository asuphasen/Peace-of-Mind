import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
// import { FireserviceService } from '../fireservice.service';
import { User } from '../../model/index'
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  gender: string;
  bloodType: string;
  birthday: string;

  constructor(
    private router: Router,
    private fireService: FireserviceService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['home']);
  }

  register() {
    let user: User = {
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      phone_number: this.phone_number,
      gender: this.gender,
      bloodType: this.bloodType,
      birthday: this.birthday,
    }
    console.log(user)
    if (this.email && this.password && this.firstname && this.lastname && this.phone_number && this.gender && this.bloodType && this.birthday) {
      this.fireService.createUser(user, this.password);
      this.navCtrl.navigateRoot(['hello']);
    } else {
      console.log("Invalid Feild")
      console.log(this.email)
      console.log(this.password)
      console.log(this.firstname)
      console.log(this.lastname)
      console.log(this.phone_number)
      console.log(this.gender)
      console.log(this.bloodType)
      console.log(this.birthday)
    }

  }

}
