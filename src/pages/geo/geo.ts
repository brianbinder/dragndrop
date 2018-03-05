import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html',
})
export class GeoPage {
  public lat;
  public long;
  public acc;

  constructor(private geolocation: Geolocation) {
    geolocation.getCurrentPosition()
      .then(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.acc = position.coords.accuracy;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeoPage');
  }

}
