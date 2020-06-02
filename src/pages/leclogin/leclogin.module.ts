import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecloginPage } from './leclogin';

@NgModule({
  declarations: [
    LecloginPage,
  ],
  imports: [
    IonicPageModule.forChild(LecloginPage),
  ],
})
export class LecloginPageModule {}
