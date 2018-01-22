import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http } from "@angular/http";

/*
  Generated class for the AirportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AirportsProvider {

  constructor(public http: Http,public httpp: HttpClient) {
    console.log('Hello AirportsProvider Provider');
  }

  getAirports(){
    return this.http.get('/assets/airport.json')
       .map(response => response.json());
   }

   getCities(){
    return this.http.get('/assets/cities.json')
       .map(response => response.json());
   }

}
