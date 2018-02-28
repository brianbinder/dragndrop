import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InitTouchPunch } from './touchPunch';
import { WordGraphMaker } from './wordGraphMaker';
@NgModule({
  providers: [
    InitTouchPunch,
    WordGraphMaker
  ]
})
export class ServicesModule {}