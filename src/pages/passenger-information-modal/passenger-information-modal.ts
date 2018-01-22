import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { PassengerDetail } from '../../app/models/passengerDetail';

/**
 * Generated class for the PassengerInformationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger-information-modal',
  templateUrl: 'passenger-information-modal.html',
})
export class PassengerInformationModalPage {

  public passengerDetail = {} as PassengerDetail;
  public countAdults= [];

  constructor(private viewController: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.passengerDetail.audlts = 1;
    this.passengerDetail.children = 0;
    this.passengerDetail.infants = 0;
    this.passengerDetail.class = "Economy";

    this.countAdults = [
      {
        key:1,
        value:1
      },
      {
        key:2,
        value:2
      },
      {
        key:3,
        value:3
      },
      {
        key:4,
        value:4
      },
      {
        key:5,
        value:5
      },
      {
        key:6,
        value:6
      },
      {
        key:7,
        value:7
      },
      {
        key:8,
        value:8
      },
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerInformationModalPage');
  }

  applyPessengerDetail(){
    
    let passengerDetails= {
      audlts: this.passengerDetail.audlts,
      children: this.passengerDetail.children,
      infants:this.passengerDetail.infants,
      class:this.passengerDetail.class
    };
    this.viewController.dismiss(passengerDetails);
  }

  closeModal(){
    let passengerDetails= {
      audlts: this.passengerDetail.audlts,
      children: this.passengerDetail.children,
      infants:this.passengerDetail.infants,
      class:this.passengerDetail.class
    };
    this.viewController.dismiss(passengerDetails);
  }
}
