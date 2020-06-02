import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAppPage } from './edit-app';

@NgModule({
  declarations: [
    EditAppPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAppPage),
  ],
})
export class EditAppPageModule {}
