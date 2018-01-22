import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase ,FirebaseObjectObservable } from 'angularfire2/database-deprecated';
// import { AngularFireDatabase  } from 'angularfire2/database';
import { Profile } from '../../app/models/profile';
import { Calendar } from '@ionic-native/calendar';
import { AirportDetail } from '../../app/models/airportDetail'

import { SearchFlightModalPage }  from '../search-flight-modal/search-flight-modal';
import { PassengerInformationModalPage } from '../passenger-information-modal/passenger-information-modal';
import { DateModalPage } from '../date-modal/date-modal'
import { PassengerDetail } from '../../app/models/passengerDetail';
import { DateDetail, DepartDateDetail, ReturnDateDetail } from '../../app/models/dateDetail';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData : FirebaseObjectObservable<Profile>;
  public disabled = false;
  // public airportCodeDeparting:AirportDetail;
  // public airportCodeFlyingTo:AirportDetail;
  public airportCodeDeparting= [];
  public airportCodeFlyingTo = [];

  public passengerDetail = {} as PassengerDetail;
  public dateDetail = {} as DateDetail;

  // public departingDate: String = new Date().toISOString();
  // public returnDate: String = new Date().toISOString();
  public departingDate= {} as DepartDateDetail;
  public returnDate= {} as ReturnDateDetail;
  public minDate:string
  public maxDate:string;
  airportName:string;
  airportContry:string;

  constructor(public globalVarialbe:GlobalVariableProvider,
    private modalCtrl : ModalController,
    private calendar: Calendar,
    private ofAuth: AngularFireAuth,
    private ofDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController) {
      // var a = ofAuth.auth.currentUser.email;
      // this.airportCodeDeparting.code = "";
      // this.airportCodeDeparting.name = "";
      // this.airportCodeDeparting.country = "";

      // this.airportCodeFlyingTo.code = "";
      // this.airportCodeFlyingTo.name = "";
      // this.airportCodeFlyingTo.country = "";

this.minDate =  new Date().toISOString();
this.maxDate = (new Date().getFullYear() +1).toString() ;

this.departingDate.now = new Date().toISOString();
this.returnDate.now = new Date().toISOString();

      this.passengerDetail.audlts = 1;
      this.passengerDetail.children = 0;
      this.passengerDetail.infants = 0;
      this.passengerDetail.class = "Economy";

      this.globalVarialbe.loginLevel = "0";
      

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

  openFlightModalDeparting(){
    let searchFlightModal = this.modalCtrl.create(SearchFlightModalPage, { });
    searchFlightModal.onDidDismiss((airportDetail) => {
    this.airportCodeDeparting = airportDetail;
   });
   searchFlightModal.present();
  }

  openFlightModalFlyingTo(){
    let searchFlightModal = this.modalCtrl.create(SearchFlightModalPage, {  });
    searchFlightModal.onDidDismiss((airportDetail) => {
    this.airportCodeFlyingTo = airportDetail;
   });
   searchFlightModal.present();
  }

  openPassengerModal(){
    let passengerModal = this.modalCtrl.create(PassengerInformationModalPage, { });
    passengerModal.onDidDismiss((passengerDetails) => {
     this.passengerDetail = passengerDetails;
    });
    passengerModal.present();
  }



  openDateModal(){
    let dateModal = this.modalCtrl.create(DateModalPage, { });
    dateModal.onDidDismiss((dateDetails) => {
     this.dateDetail = dateDetails;
    });
    dateModal.present();
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
