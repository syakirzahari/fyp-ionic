import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecTimetablePage } from './lec-timetable';

@NgModule({
  declarations: [
    LecTimetablePage,
  ],
  imports: [
    IonicPageModule.forChild(LecTimetablePage),
  ],
})
export class LecTimetablePageModule {}
