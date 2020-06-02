import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { storage, initializeApp } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { FIREBASE_INFO } from '../../app/firebase.info';
import * as firebase from 'firebase';

interface FeaturedPhotosUrls {
  url1?: string;
  url2?: string;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: Observable<any>
  public featuredPhotoStream: AngularFireObject<FeaturedPhotosUrls>;
  captureDataUrl: string;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  

  //items = [];
 // ref = firebase.database().ref('item/');
 // name:string ='';
  //student:string ='';
  //program:string ='';
  //group:string ='';
 // sem: string ='';
  //phoneNum: string ='';

  constructor(
    //private camera: Camera,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    platform: Platform){

      //initializeApp(FIREBASE_INFO);
      //this.featuredPhotoStream = this.afDatabase.object('/photos/featured');
      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)

     
  
 
  }

 ionViewWillLoad(){
   this.afAuth.authState.take(1).subscribe( data => {
     if (data && data.email && data.uid ) {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
     }
   })
  }

  editItem(){
    this.navCtrl.push('EditprofilePage');
  }
 
  featuredPhotoSelected(event: any){
    const file: File = event.target.files[0];
    console.log("Selected filename: ", file.name);

    const metaData = {'contentType': file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1');
    storageRef.put(file, metaData);
    console.log("Uploading: ", file.name);
}

  
 

 
  //async delItem() {
    //let alert = this.alertCtrl.create({
    //  title: 'Confirm Delete',
    //  message: 'Do you want to delete this information?',
    //  buttons: [
    //    {
     //     text: 'Cancel',
     //     role: 'cancel',
      //    handler: () => {
     //       console.log('Cancel clicked');
      //    }
     //   },
        //{
         // text: 'Delete',
         // handler: () => {
          //  this.afAuth.authState.take(1).subscribe( data => {
          //    if (data && data.email && data.uid ) {
            //   this.afDatabase.object(`profile/${data.uid}`).remove();
          //    }
          //  })
         // }
       // }
      //]
   // });
  //  alert.present();
 // }
}