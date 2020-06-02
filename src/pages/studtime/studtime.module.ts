import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudtimePage } from './studtime';

@NgModule({
  declarations: [
    StudtimePage,
  ],
  imports: [
    IonicPageModule.forChild(StudtimePage),
  ],
})
export class StudtimePageModule {}
