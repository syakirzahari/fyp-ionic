import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { Book2Page } from './book2';

@IonicPage()
@NgModule({
  declarations: [
    Book2Page,
  ],
  imports: [
    IonicPageModule.forChild(Book2Page),
  ],
})
export class Book2PageModule {}
