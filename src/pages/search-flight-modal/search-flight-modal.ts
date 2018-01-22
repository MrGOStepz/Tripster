import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirportsProvider } from '../../providers/airports/airports'
/**
 * Generated class for the SearchFlightModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-flight-modal',
  templateUrl: 'search-flight-modal.html',
})
export class SearchFlightModalPage {

  constructor(public airportProviers:AirportsProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  searchQuery: string = '';
  items: string[];
  public airport = {};

  ionViewDidLoad() {
    this.initializeItems();
  }

  initializeItems() {
    this.airportProviers.getAirports()
      .subscribe(respone => {
        this.airport = respone
      });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
