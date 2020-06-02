import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LecTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lec-tabs',
  templateUrl: 'lec-tabs.html',
})
export class LecTabsPage {
  tab1Root = 'LecHomePage';
  tab2Root = 'LecTimetablePage';
  tab3Root = 'LecProfilePage';
  tab4Root = 'LecSettingPage';
  tab5Root = 'UsernamePage';
  myIndex: number; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecTabsPage');
  }

}
