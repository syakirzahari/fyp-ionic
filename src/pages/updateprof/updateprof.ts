import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'
//import { Camera, DestinationType } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-updateprof',
  templateUrl: 'updateprof.html',
})
export class UpdateprofPage {

  profile = {} as Profile;
  public update = [];
  picdata:any
  picurl:any
  mypicref:any
  selectedFiles: FileList;
  flie: File;
  imgsrc;
  downloadURL;

  constructor(public navCtrl: NavController, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private storage: AngularFireStorage ){
     
   
  }


 addItem(){

   this.afAuth.authState.take(1).subscribe(auth => {
     this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
     .then(() => this.navCtrl.setRoot('TabsPage'));
   })


 }

 presentItem() {
  let alert = this.alertCtrl.create({
    title: 'Save Succesfully!',
    subTitle: 'Your Profile has been saved!',
    buttons: [
    {
      text: 'OK',
      handler: () => {
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot('TabsPage'));
        })
      }
    }

  
  ]
  });
  let updateLoadingController = this.loadingController.create({
    content: " Please Wait...",
    spinner: 'bubbles',
    duration: 2000,
  });
  updateLoadingController.present();
    
  alert.present()
  this.navCtrl.setRoot('TabsPage');
}




}
