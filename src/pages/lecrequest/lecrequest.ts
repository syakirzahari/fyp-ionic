import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { UploadService } from './../../services/upload/upload.service';
import { Request } from '../../models/request';
import * as _ from "lodash";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { RequestService } from './../../services/request/request';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera'

//import { File } from '@ionic-native/file';
import * as firebase from 'firebase';
//import { HttpClient, HttpEventType } from '@angular/common/http';
//declare var cordova: any;


/**
 * Generated class for the LecrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lecrequest',
  templateUrl: 'lecrequest.html',
})
export class LecrequestPage {

  captureDataUrl: string;
  request: Request = {
    name:'',
    pass: '',
    id:'',
    email:'',
    preferred:'',
    image: 'Picture.downloadURL'
  
  }
  @Input('useURI') useURI: Boolean = true;
  subjectListRef$: Observable<any>
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public FilePath:FilePath,
    public FileChooser:FileChooser,
    private afDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private request1: RequestService,
    private camera: Camera

    //private file: File,
     ) {
    
      this.myPhotosRef = firebase.storage().ref('/Photos/');  
  }

  addAcc(request: Request){
    if (this.request.name == "" || this.request.pass == "" || this.request.email == ""|| this.request.id == "") {
      const alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "Please fill in all fields",
        buttons: ["OK"]
      });
      alert.present();
      } 
      else {
        this.request1.addItem(request).then(ref => {
          this.navCtrl.setRoot('HomescreenPage', { key: ref.key});
      });

      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
    
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);
    
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then(Picture => {
        firebase
          .database()
          .ref(`users/user1/profilePicture`)
          .set(Picture.downloadURL);
      });

      const alert = this.alertCtrl.create({
        title: "Thank You",
        subTitle: "Your request will be processed by admin.",
        buttons: ["OK"]
      });
      alert.present();
      } 
  }

 // async openCam(){
 //   const options: CameraOptions = {
    //  quality: 100,
     // destinationType: this.camera.DestinationType.DATA_URL,
  //    encodingType: this.camera.EncodingType.JPEG,
   //   mediaType: this.camera.MediaType.PICTURE,
    //  sourceType: this.camera.PictureSourceType.CAMERA
   // }

    //return await this.camera.getPicture(options)

 // }

 getPicture(sourceType){
  const cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: sourceType
  };

  this.camera.getPicture(cameraOptions)
   .then((captureDataUrl) => {
     this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
  }, (err) => {
      console.log(err);
  });
} 

 
 
  ionViewDidLoad() {

    this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();
    console.log('ionViewDidLoad LecrequestPage');
  }

  

  

}
