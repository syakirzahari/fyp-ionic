import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_INFO } from './firebase.info';
import { HomePageModule } from '../pages/home/home.module';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HomescreenPageModule } from '../pages/homescreen/homescreen.module'
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Book2PageModule } from '../pages/book2/book2.module';
import { SlidePageModule } from '../pages/slide/slide.module';
import { Platform } from 'ionic-angular';
//import { AddbookPageModule } from '../pages/addbook/addbook.module';
import { Push } from '@ionic-native/push/ngx';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
//import { ImghandlerProvider } from '../providers/imghandler/imghandler';
//import { FCM } from '@ionic-native/fcm';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ChatProvider } from '../providers/chat/chat';
import { AppointmentService } from './../services/appointment/appointment.service';
import { SlidePage } from '../pages/slide/slide';
import { Storage } from '@ionic/storage';
//import {SharedModule} from './shared.module'
import { ReactiveFormsModule } from "@angular/forms";
import { FCM } from '@ionic-native/fcm';
import {AndroidFullScreen} from "@ionic-native/android-full-screen";
import { IonicStorageModule } from '@ionic/storage';
import * as firebase from "firebase";
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FirebaseService } from './../services/firebase.service';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { AcceptedService } from './../services/accepted/accepted.service';
//import { LecrequestPageModule } from '../pages/lecrequest/lecrequest.module'
import { RequestService } from './../services/request/request';
import { FcmProvider } from './../providers/fcm'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';

@NgModule({

  

  declarations: [
    MyApp,
   // SlidePage
 
   
  ],
  imports: [
   
    BrowserModule,
    IonicModule.forRoot(MyApp, { statusbarPadding: true }),
    AngularFireAuthModule,
    HomePageModule,
    AngularFireModule.initializeApp(FIREBASE_INFO),
    AngularFireDatabaseModule,
    FormsModule,
    HomescreenPageModule,
    Book2PageModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule,
    HttpClientModule,
    AngularFirestoreModule,
    

   // SlidePageModule,
   // SharedModule
    
   
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //SlidePage
    

  ],
  providers: [
    [StatusBar],
    SplashScreen, FileChooser, File,
    Camera,
    Crop,
    ImagePicker,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    AuthProvider,
    UserProvider,
    ChatProvider,
    AppointmentService,
    AcceptedService,
    FirebaseService,
    AndroidFullScreen,
    FilePath,
    RequestService,
    FcmProvider,
    Firebase,
    

    //Platform,
    //Storage

  ]
})
export class AppModule {}
