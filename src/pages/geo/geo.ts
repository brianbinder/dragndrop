import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html',
})
export class GeoPage {
  public lat = 'loading';
  public long = 'loading';
  public acc = 'loading';

  constructor(private geolocation: Geolocation) {
    geolocation.getCurrentPosition()
      .then(position => {
        this.lat = position.coords.latitude.toString();
        this.long = position.coords.longitude.toString();
        this.acc = position.coords.accuracy.toString();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeoPage');
  }

}
