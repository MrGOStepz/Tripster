import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  constructor(public alertCtrl: AlertController,
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
    this.ofAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(data => {
      this.alert('Register Success!');
    })
    .catch(error => {
      this.alert(error.message);
    })
  }
}
