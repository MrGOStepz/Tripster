import { Component,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { DateDetail } from '../../app/models/dateDetail'
/**
 * Generated class for the DateModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-modal',
  templateUrl: 'date-modal.html',
})
export class DateModalPage {

  public dateDeail = {} as DateDetail;
  currentEvents:any = new EventEmitter();
  constructor(private viewController: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateModalPage');
  }

  applyPessengerDetail(){
    
    let dateDetails= {

    };
    this.viewController.dismiss(dateDetails);
  }

  closeModal(){
    let passengerDetails= {

    };
    this.viewController.dismiss(passengerDetails);
  }

  onDaySelect(ev:any)
  {
    console.log(this.currentEvents.emit(ev));
    console.log(this.currentEvents.value);
    // console.log("test" + this.currentEvents);
        // this.currentEvents.year
    // let val = ev.traget.value;
    // console.log("Day " + val);
    // console.log("Day " + val);
  }

  onMonthSelect(ev){
    let val = ev;
    console.log("Month " + val);
  }
}
