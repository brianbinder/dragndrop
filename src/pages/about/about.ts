import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Grid } from '../../providers/grid';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private grid: Grid) { }

  ionViewWillEnter(): void {
    $('#canvasContainer').empty();
    this.grid.make();
  }

}
