import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SlidePage } from '../slide/slide';
//import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
})

export class HomescreenPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modal: ModalController,
   ) {
  }

  openStud(){
    const myModal = this.modal.create('HomePage');

    myModal.present();
  }

  openLec(){
    const myModal = this.modal.create('LecloginPage');

    myModal.present();
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad HomescreenPage');
  }

}
