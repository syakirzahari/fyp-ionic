import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecHomePage } from './lec-home';

@NgModule({
  declarations: [
    LecHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LecHomePage),
  ],
})
export class LecHomePageModule {}
