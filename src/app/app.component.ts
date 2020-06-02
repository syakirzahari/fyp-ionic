import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SlidePage } from '../pages/slide/slide';
import { HomescreenPage } from '../pages/homescreen/homescreen';
import {AndroidFullScreen} from "@ionic-native/android-full-screen";
import { Book2Page } from '../pages/book2/book2';
import { initializeApp } from 'firebase';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { LecTimetablePage } from '../pages/lec-timetable/lec-timetable';
import { App } from 'ionic-angular';
import { FcmProvider } from './../providers/fcm';
import { tap } from 'rxjs/operators';


//import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;;
  //rootPage:any = Book2Page;
  //rootPage:any = LecTimetablePage;
  rootPage:any = SlidePage;
  loader: any;
  public counter=0;

  constructor(public loadingCtrl: LoadingController, 
    public storage: Storage, 
    public androidFullScreen: AndroidFullScreen, 
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public app: App,
    public toastCtrl: ToastController,
    fcm: FcmProvider)
{
     
      this.androidFullScreen.isSupported()
     .then(() => this.androidFullScreen.showSystemUI());

     
    
       this.platform.ready().then(() => {

        fcm.getToken()

        fcm.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = toastCtrl.create({
              message: msg.body,
              duration: 3000
            });
            toast.present();
          })
        ).subscribe()
      

        

       
         this.statusBar.styleLightContent();

          if (this.platform.is('android')) {
           this.statusBar.overlaysWebView(false);

           this.statusBar.backgroundColorByHexString("#6F3CB7");
        
           }

     

      
      
      this.splashScreen.hide();
      
      
      
     });

     
     



  

     this.presentLoading();
     
     

      this.platform.ready().then(() => {

    

        this.storage.get('introShown').then((result) => {

      if(result){
        this.rootPage = 'HomescreenPage';
      } else {
        this.rootPage = 'SlidePage';
        this.storage.set('introShown', true);
      }

      this.loader.dismiss();

    });

     });

     

     platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 3000)
      }
      else {
        // console.log("exitapp");
        platform.exitApp();
      }
        }, 0)
     
        
  
      }

  
  

     presentLoading() {

        this.loader = this.loadingCtrl.create({
          content: "Authenticating..."
        });

        this.loader.present();
       }

      presentToast() {
          let toast = this.toastCtrl.create({
           message: "Press again to exit",
           duration: 2000,
           position: "bottom"
           });
            toast.present();
           }

 
    



 
  
}






