import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform  } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'

/**
 * Generated class for the LecProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lec-profile',
  templateUrl: 'lec-profile.html',
})
export class LecProfilePage {

  profileData: Observable<any>
  constructor(
    //private camera: Camera,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    platform: Platform){

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)
  
  }

 

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`lecturer/${data.uid}`).valueChanges();
      }
    })
    console.log('ionViewDidLoad LecProfilePage');
  }

  editItem(){
    this.navCtrl.push('LeceditprofPage');
  }
 

}
