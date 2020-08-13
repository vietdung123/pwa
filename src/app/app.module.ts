import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { PushNotificationService } from './push-notification.service'

const firebaseConfig = {
  apiKey: 'AIzaSyCmoBA8u39J3ISpEVetMSg4h5IScjwFhjk',
  authDomain: 'internshippg-8c4ae.firebaseapp.com',
  databaseURL: 'https://internshippg-8c4ae.firebaseio.com',
  projectId: 'internshippg-8c4ae',
  storageBucket: 'internshippg-8c4ae.appspot.com',
  messagingSenderId: '1014474425974',
  appId: '1:1014474425974:web:3d47d7f8c519693f7ac157',
  measurementId: 'G-EB04BH38HG'
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
  ],

  providers: [PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
