import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, normalizeURL } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FirebaseService } from './../../services/firebase.service';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  profileData: Observable<any>
  profile = {} as Profile;
  captureDataUrl: string;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  groupRef$: Observable<any>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private camera: Camera,
    public firebaseService: FirebaseService,
    public image1: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public imagePicker: ImagePicker,
    public alertCtrl: AlertController
    ) {

      this.afAuth.authState.take(1).subscribe( data => {
        if (data && data.email && data.uid ) {
          const profileData = this.navParams.get('data.uid');
          console.log(data.uid);

          this.profileData = this.afDatabase.object(`/profile/${data.uid}`).valueChanges();

          this.profileData.subscribe(
            profile => this.profile = profile);
          
         }
      })

      

     
     }

  
  updateProfile(){
 
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).update(this.profile)
      .then(() => this.navCtrl.pop());
    });

   
   
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    })
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    })
  }
 
  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }
 
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ionViewDidLoad(){
    this.groupRef$ = this.afDatabase.list(`group`).valueChanges();
  }
}

  




