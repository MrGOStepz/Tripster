import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';

import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database-deprecated';

import { Message } from '../../app/models/sendMessage';
import { MessageItem } from '../../app/models/message-item.interface'
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable'


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public loginUser:boolean;
  public sendMessageUser = {} as Message;
  public messages: object[] = [];
  
  messageListRef$: FirebaseListObservable<MessageItem[]>;

  constructor(public globalVarialbe:GlobalVariableProvider,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public navCtrl: NavController) {
  
    this.messageListRef$ = this.db.list('MessageContact');
    this.globalVarialbe.loginLevel = "0";

  }



  sendMessage(){
    this.db.list('/MessageContact').push({
      email: this.sendMessageUser.email,
      message: this.sendMessageUser.message,
      checked: "fail"
    }).then(() => {
      //message is sent
    })
    // .catch (() => {
    //   //some error. maybe firebase is unrechable
    // })
    this.sendMessageUser.email ='';
    this.sendMessageUser.message ='';
    this.alert("Send message complete!");
  }

  alert(message:string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons:['OK']
    }).present();
    
  }

  ionViewWillEnter(){
    console.log("Contact Enter: " + this.globalVarialbe.loginLevel)
    if(this.globalVarialbe.loginLevel == "0"){
      this.loginUser = false;
    }
    else{
      this.loginUser = true;
    }

  }


}
