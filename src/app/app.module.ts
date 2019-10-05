import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { StreamingMedia } from '@ionic-native/streaming-media/ngx' 
import { IonicRatingModule } from 'ionic4-rating';
import { RatingPageModule } from './doctor-preview/rating/rating.module';


var firebaseConfig = {
  apiKey: "AIzaSyDJ-6Bdpx8-kmJ-HqMEi3HuJRBVs71473k",
  authDomain: "peace-of-mind-3efe6.firebaseapp.com",
  databaseURL: "https://peace-of-mind-3efe6.firebaseio.com",
  projectId: "peace-of-mind-3efe6",
  storageBucket: "",
  messagingSenderId: "855185603609",
  appId: "1:855185603609:web:19b6304c83c1506d"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicRatingModule,
    RatingPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StreamingMedia,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
