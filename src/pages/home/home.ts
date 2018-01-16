import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase ,FirebaseObjectObservable } from 'angularfire2/database-deprecated';
// import { AngularFireDatabase  } from 'angularfire2/database';
import { Profile } from '../../app/models/profile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public event = {
    timeStarts: new Date('dd MM yyyy'),
  }
  profileData : FirebaseObjectObservable<Profile>;

  constructor(private ofAuth: AngularFireAuth,
              private ofDatabase: AngularFireDatabase,
              private toast: ToastController,
              public navCtrl: NavController) {
      var a = ofAuth.auth.currentUser.email;
  }




  ionViewWillLoad(){
    this.ofAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
      this.toast.create({
        message:'Hello ' + data.email,
        duration:3000
      }).present();

       console.log( data.uid);
       this.profileData = this.ofDatabase.object('/profile/' + data.uid);
    }
    else
    {
      this.toast.create({
        message:'Could not find detail',
        duration:3000
      }).present();
    }
    });
  }

}
