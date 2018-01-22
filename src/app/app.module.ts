import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
  import { AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import {FirebaseObjectObservable} from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SearchFlightModalPage } from '../pages/search-flight-modal/search-flight-modal';
import { PassengerInformationModalPage } from '../pages/passenger-information-modal/passenger-information-modal';
import { DateModalPage } from '../pages/date-modal/date-modal'


import { CalendarModule } from 'ionic3-calendar-en';
import { Calendar } from '@ionic-native/calendar';
import { AirportsProvider } from '../providers/airports/airports';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariableProvider } from '../providers/global-variable/global-variable';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ForgotPasswordPage,
    SearchFlightModalPage,
    PassengerInformationModalPage,
    DateModalPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ForgotPasswordPage,
    SearchFlightModalPage,
    PassengerInformationModalPage,
    DateModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    AirportsProvider,
    HttpClientModule,
    GlobalVariableProvider
  ]
})
export class AppModule {}
