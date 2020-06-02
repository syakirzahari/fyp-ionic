import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecProfilePage } from './lec-profile';

@NgModule({
  declarations: [
    LecProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LecProfilePage),
  ],
})
export class LecProfilePageModule {}
