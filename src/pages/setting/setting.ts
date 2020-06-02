import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  logout = [];

  constructor(public loadingController: LoadingController, public navCtrl: NavController, private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  openWebpage(){

    const options : InAppBrowserOptions = {
      zoom: 'yes'
      
    }
    const browser = this.inAppBrowser.create('https://simsweb.uitm.edu.my/SPORTAL_APP/SPORTAL_LOGIN/index.htm', '_self', options);
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
    let logoutLoadingController = this.loadingController.create({
      content: " Please Wait...",
      spinner: 'bubbles',
      duration: 2000,
    });
    logoutLoadingController.present();
    
    this.navCtrl.setRoot('HomescreenPage');
    window.location.reload();
  }

}
