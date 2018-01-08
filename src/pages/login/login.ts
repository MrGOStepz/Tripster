import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';

import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';

import { AlertController } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  rememberUser = {} as User;
 checkRemember:boolean;
  constructor(public alertCtrl: AlertController,private ofAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
    var checkStatus = localStorage.getItem("CheckStatus");
    if(checkStatus == 'true'){
      this.checkRemember = true;
    }else{
      this.checkRemember = false;
    }

    localStorage.setItem("email",''); 
    localStorage.setItem("pw", ''); 
    console.log('ionViewDidLoad LoginPage');
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("pw");
    if(email != '' && password != '')
    {
      this.rememberUser.email = email;
      this.rememberUser.password = password;
      this.login(this.rememberUser);
    }
  }

  alert(message:string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons:['OK']
    }).present();
    
  }

  
  ionViewDidLoad() {

  }

  login(user:User){
    this.ofAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then(data =>{
      console.log('got some data', data);
              if(this.checkRemember){
          localStorage.setItem("email",this.user.email); 
          localStorage.setItem("pw", this.user.password); 
          //localStorage.getItem("email");
          }
          else{
            localStorage.setItem("email",''); 
            localStorage.setItem("pw",''); 
          }
          this.alert('Login Success!');
        this.navCtrl.setRoot(TabsPage);
    })
    .catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
    console.log('Would sign in with ', user.email,user.password);
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  rememberMe(){
    if(this.checkRemember == true){
      localStorage.setItem("CheckStatus","true");   
    }else{
      localStorage.setItem("CheckStatus","false"); 
    }
  }

  forgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
    //ofAuth.auth.sendPasswordResetEmail(email).then(res => {});
  }

}
