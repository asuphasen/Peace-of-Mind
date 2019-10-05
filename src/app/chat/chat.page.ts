import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  doctorName: string;

  constructor(private router: Router,
    private navCtr: NavController,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      console.log(params)
      this.doctorName = params.name
    })
  }

  back() {
    // this.router.navigate(['doctor-preview']);
    this.navCtr.back();
  }

}
