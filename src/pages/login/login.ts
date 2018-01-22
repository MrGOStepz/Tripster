import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { User } from '../../app/models/user';

import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';

import { AlertController } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { Profile } from '../../app/models/profile';
import { AngularFireDatabase,FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  profileData : FirebaseObjectObservable<Profile>;
  user = {} as User;
  rememberUser = {} as User;
 checkRemember:boolean;
 profile = {} as Profile;
 public checkLogin:boolean;

  constructor(public globalVarialbe:GlobalVariableProvider,
     private ofDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    private toast: ToastController, 
    public navParams: NavParams) {

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
          this.checkLogin = true;
          this.initializeProfile();
        //this.navCtrl.setRoot(TabsPage);
    })
    .catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
    console.log('Would sign in with ', user.email,user.password);
  }

  initializeProfile(){
    console.log("Profile Level :" +this.profile.level);
    this.ofAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
      this.toast.create({
        message:'Hello ' + data.email,
        duration:3000
      }).present();

       console.log( data.uid);
       this.profileData = this.ofDatabase.object('/profile/' + data.uid);

       this.profileData.subscribe(profileDatas => {
         this.profile = profileDatas;
         console.log("Profile Level :" +this.profile.level);
         this.globalVarialbe.loginLevel = this.profile.level;
        }
        );
       

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

  logoutUser(){
    this.checkLogin = false;
    this.user.email = "";
    this.user.password = "";
    this.globalVarialbe.loginLevel = "0";
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

  updateProfile(){
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
