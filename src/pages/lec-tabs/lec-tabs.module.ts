import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecTabsPage } from './lec-tabs';

@NgModule({
  declarations: [
    LecTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(LecTabsPage),
  ],
})
export class LecTabsPageModule {}
