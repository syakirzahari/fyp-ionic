import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecSettingPage } from './lec-setting';

@NgModule({
  declarations: [
    LecSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LecSettingPage),
  ],
})
export class LecSettingPageModule {}
