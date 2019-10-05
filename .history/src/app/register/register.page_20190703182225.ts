import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public form = [
    { val: 'ชาย', isChecked: true },
    { val: 'หญิง', isChecked: false }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['home']);
  }

}
