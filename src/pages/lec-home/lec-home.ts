import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { platformBrowser } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-lec-home',
  templateUrl: 'lec-home.html',
})
export class LecHomePage {

  profileData: Observable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth, private push: Push, statusBar: StatusBar, platform: Platform, splashScreen: SplashScreen) {
      platform.ready().then(() => {
        statusBar.styleLightContent();
        splashScreen.hide();
        this.pushSetup();
      });

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)
  }

  pushSetup(){

    
const options: PushOptions = {
   android: {
     senderID: '951629332271'
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   }
}


}

  profpage(){
    this.navCtrl.push('LecProfilePage');
  }

  histpage(){
    this.navCtrl.push('HistoryPage');
  }

  statpage(){
    this.navCtrl.push('CbookPage');
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`lecturer/${data.uid}`).valueChanges();
      }
    })
    console.log('ionViewDidLoad LecHomePage');
  }

}
