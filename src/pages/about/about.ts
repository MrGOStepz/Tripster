import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../app/models/profile';
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
// import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  profile = {} as Profile;

  constructor(private ofAuth: AngularFireAuth,
    private ofDatabase: AngularFireDatabase,
    public navCtrl: NavController) {

  }

  createProfile(){
    this.ofAuth.authState.take(1).subscribe(auth => {
      console.log(this.profile.firstName);
      this.ofDatabase.object('/profile/' + auth.uid ).set(this.profile)
      .then(() => {
        //message is sent
      });
      //.then(() =>this.navCtrl.setRoot('HomePage'));
    })
  }
}
