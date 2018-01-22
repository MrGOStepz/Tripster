import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { Profile } from '../../app/models/profile';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;

  constructor(private ofDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  alert(message:string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons:['OK']
    }).present();
  }

  register(user: User){

    this.profile.firstName = "";
    this.profile.lastName = "";
    this.profile.level = "0";
    this.profile.username = "";

    this.ofAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(data => {
      this.alert('Register Success!');
      this.ofDatabase.object('/profile/' + data.uid ).set(this.profile)
    })
    .catch(error => {
      this.alert(error.message);
    })
    
  }
}
