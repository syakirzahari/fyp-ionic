import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the LecSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lec-setting',
  templateUrl: 'lec-setting.html',
})
export class LecSettingPage {


  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser) {
  }

  openWebpage(){

    const options : InAppBrowserOptions = {
      zoom: 'yes'
      
    }
    const browser = this.inAppBrowser.create('https://i-learn.uitm.edu.my/v3/users/loginForm/2', '_self', options);
  }
  openWebpage1(){

    const options : InAppBrowserOptions = {
      zoom: 'yes'
      
    }
    const browser = this.inAppBrowser.create('https://melaka.uitm.edu.my/v2/index.php/centre-of-studies-fskm/computer-technology-networking-studies', '_self', options);
  }
  openWebpage2(){

    const options : InAppBrowserOptions = {
      zoom: 'yes'
      
    }
    const browser = this.inAppBrowser.create('http://ctncloud.uitm.edu.my/fskm/', '_self', options);
  }
  openWebpage3(){

    const options : InAppBrowserOptions = {
      zoom: 'yes'
      
    }
    const browser = this.inAppBrowser.create('https://www.uitm.edu.my/index.php/en/', '_self', options);
  }


  keluar(){
    this.navCtrl.setRoot('HomescreenPage');
    window.location.reload();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LecSettingPage');
  }

}
