import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TouchPunchProvider } from '../providers/touchPunch';
import { WordGraphMakerProvider } from '../providers/wordGraphMaker';
import { Grid } from '../providers/grid';

import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

class GeoMock {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      resolve({
        coords: {
          latitude: 'Mocked lat',
          longitude: 'Mocked long',
          accuracy: 'Mocked accuracy'
        },
        timestamp: Date.now()
      });
    });
  }
}

export class AppProviders {
  public static getProviders() {
    let providers;

    if (document.URL.includes('http')) {
      providers = [
        StatusBar,
        SplashScreen,
        TouchPunchProvider,
        WordGraphMakerProvider,
        Grid,
        //{provide: Geolocation, useClass: GeoMock },
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
      ];
    } else {
      providers = [
        StatusBar,
        SplashScreen,
        TouchPunchProvider,
        WordGraphMakerProvider,
        Grid,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
      ];
    }
    return providers;
  }
}