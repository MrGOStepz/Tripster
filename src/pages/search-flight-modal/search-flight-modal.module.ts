import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFlightModalPage } from './search-flight-modal';

@NgModule({
  declarations: [
    SearchFlightModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFlightModalPage),
  ],
})
export class SearchFlightModalPageModule {}
