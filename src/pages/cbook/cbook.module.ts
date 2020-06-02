import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CbookPage } from './cbook';

@NgModule({
  declarations: [
    CbookPage,
  ],
  imports: [
    IonicPageModule.forChild(CbookPage),
  ],
})
export class CbookPageModule {}
