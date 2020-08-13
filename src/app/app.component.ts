
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { PushNotificationService } from './push-notification.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';
  employee: any;
  // user$;
  currentUser;
  prompt;
  VAPID_PUBLIC_KEY = "BFcFRHlvD2u_K41jgFPJ79yD4GSuQnUNrsDPp0Dm2p5myrmjgT6CbIzHkrCE8DXoQUflPNralbQV2wSnofcyt8A";
  // currentMessage = new BehaviorSubject(null);
  private messaging = firebase.messaging();

  // addBtn = <HTMLElement><any>document.querySelector('.add-button');


  constructor(private http: HttpClient,
    private afAuth: AngularFireAuth,
    private swPush: SwPush,
    private afMessaging: AngularFireMessaging,
    private pushService: PushNotificationService
  ) {
    // this.user$ = this.afAuth.authState
    //   .pipe(
    //     switchMap(user => {
    //       if (user) {
    //         return of(user);
    //       }
    //       else return of(null);
    //     })
    //   );
      this.afMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      );
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        this.prompt = event;
        console.log(this.prompt);
      });
  }


  ngOnInit() {
    this.http.get(`https://jsonplaceholder.typicode.com/users`).subscribe(res => { this.employee = res; });
    // this.user$.subscribe(res => this.currentUser = res);

    this.receiveMessage();
  }
  a2hs(){
    this.prompt.prompt();
    this.prompt.userChoice.then(choice => { this.prompt = null;});
  }
  GoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(

      );
  }
  enableNotification() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {

        console.log(sub);
        // this.pushService.sendSubscriptionToTheServer(sub).subscribe(res => console.log(res));
      })
      .catch((err) => console.log(err));
  }

  async requestPushNotificationsPermission() {
    this.afMessaging.requestToken // getting tokens
      .subscribe(
        (token) => {
          console.log(token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  receiveMessage() {
    this.messaging.onMessage(
      (payload) => {
        console.log("new message received. ", payload);
        // this.currentMessage.next(payload);
      })
    //  `curl -X POST \
    //   https://fcm.googleapis.com/fcm/send \
    //   -H 'Authorization: key=AAAA7DNjRnY:APA91bE169jkDMZdpbD1Nx5MKcpP1t9815zM7R0s3AgnSrfq9fV1FzlZxt1Vogi9_EmCMJnZP5iu1V2V6rAlfxvr0pqwr135wyYnZ63netxQNGEIYf1VjEITev9U0RH31scIYFnKKsDY' \
    //   -H 'Content-Type: application/json' \
    //   -d '{
    //  "notification": {
    //   "title": "Hello World",
    //   "body": "This is Message from Admin"
    //  },
    //  "to" : "eNeJOBk6XBtjc9QrbzUf6r:APA91bHsoQpu0v-21kufxaWDV2iTVJRGm9-SUZX2SOlf8l7piIrhDk6e1Pj1oBxXglIWt9-NZ_1mKE0W3bt74se7_3Pc6BIEIXXhJzThqH5jO1Gt1MkVKWrZ6lroZZsZB7R-5IGOEFUp"
    // }'`)
  }

}
