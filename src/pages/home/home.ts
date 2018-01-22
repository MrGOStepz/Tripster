import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase ,FirebaseObjectObservable } from 'angularfire2/database-deprecated';
// import { AngularFireDatabase  } from 'angularfire2/database';
import { Profile } from '../../app/models/profile';
import { Calendar } from '@ionic-native/calendar';

import { SearchFlightModalPage }  from '../search-flight-modal/search-flight-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData : FirebaseObjectObservable<Profile>;
  public disabled = false;

  constructor(private modalCtrl : ModalController,
    private calendar: Calendar,
    private ofAuth: AngularFireAuth,
    private ofDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController) {
      // var a = ofAuth.auth.currentUser.email;


  }

  createCalendar()
  {
      this.calendar.createCalendar('MyCalendar').then(
        (msg) => { console.log(msg); },
        (err) => { console.log(err); }
      );
  }

  DisableReturnDate(){
    this.disabled = false;    
  }

  AbleReturnDate(){
    this.disabled = true;    
  }

  openFlightModal(){
    let profileModal = this.modalCtrl.create(SearchFlightModalPage, { userId: 8675309 });
   profileModal.onDidDismiss(data => {
     console.log('Hello');
   });
   profileModal.present();
  }

  ionViewWillLoad(){
    // this.ofAuth.authState.subscribe(data => {
    //   if(data && data.email && data.uid)
    //   {
    //   this.toast.create({
    //     message:'Hello ' + data.email,
    //     duration:3000
    //   }).present();

    //    console.log( data.uid);
    //    this.profileData = this.ofDatabase.object('/profile/' + data.uid);
    // }
    // else
    // {
    //   this.toast.create({
    //     message:'Could not find detail',
    //     duration:3000
    //   }).present();
    // }
    // });
  }

}
