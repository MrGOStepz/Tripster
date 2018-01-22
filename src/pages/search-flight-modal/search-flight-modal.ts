import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(private viewController: ViewController,
    public airportProviers:AirportsProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  searchQuery: string = '';
  items: string[];
  public airports = [];
  private airportsData = [];
  private citiesData = [];

  airportCode:string;
  tets: string = '';

  ionViewDidLoad() {
    // this.initializeItems();
    this.airportProviers.getAirports()
    .subscribe(respone => {
      this.airportsData = respone
    });

    this.airportProviers.getCities()
    .subscribe(respone => {
      this.citiesData = respone
    });
  }

  initializeItems() {
    this.airportProviers.getAirports()
      .subscribe(respone => {
        this.airportsData = respone
        console.log(this.airports.keys);
      });

    // this.tets = this.airportProviers.getTest();
    // console.log(this.tets);

  }

  setAirportCode(airport){
    console.log(airport)
    let airportDetail= {
      code: airport.code,
      name: airport.name,
      country:""
    };
    this.viewController.dismiss(airportDetail);
  }

  closeModal(){
    let airportDetail= {
      code: "",
      name: "",
      country:""
    };
    this.viewController.dismiss(airportDetail);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.airports = this.airportsData.filter((airportsData) => {
        return (airportsData['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
