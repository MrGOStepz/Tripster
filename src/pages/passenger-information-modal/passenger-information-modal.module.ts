import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerInformationModalPage } from './passenger-information-modal';

@NgModule({
  declarations: [
    PassengerInformationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerInformationModalPage),
  ],
})
export class PassengerInformationModalPageModule {}
