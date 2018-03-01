import { Component, OnDestroy } from '@angular/core';
import { Grid } from '../../providers/grid';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnDestroy {
  private listenerSubscription;

  constructor(private grid: Grid) { }

  ionViewWillEnter(): void {
    $('#canvasContainer').empty();
    this.listenerSubscription = this.grid.make();
  }

  ngOnDestroy() {
    this.listenerSubscription.unsubscribe();
  }

}
