import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdittimePage } from './edittime';

@NgModule({
  declarations: [
    EdittimePage,
  ],
  imports: [
    IonicPageModule.forChild(EdittimePage),
  ],
})
export class EdittimePageModule {}
