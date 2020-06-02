import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { HomescreenPage } from './../homescreen/homescreen';

/**
 * Generated class for the SlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() { 
   
    console.log('ionViewDidLoad SlidePage');
  }

  pushPage(){
    this.navCtrl.push('HomescreenPage');
  }

}
