import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Lecturer } from '../../models/lecturer';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-leclogin',
  templateUrl: 'leclogin.html',
})
export class LecloginPage {

  lecturer = {} as Lecturer;
  
  constructor(private fireAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController,
     public navParams: NavParams, 
     private view: ViewController,
     private toast: ToastController, 
     public loadingController: LoadingController,
     platform: Platform ) {

         
    let backAction =  platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    },2)
  }


  async depan(lecturer: Lecturer){

    try{
      const info = await this.fireAuth.auth.signInWithEmailAndPassword(lecturer.email +'@uitm.edu.my', lecturer.password);

      if(info){
        await this.navCtrl.setRoot('LecTabsPage');
      }

      let loginLoadingController = this.loadingController.create({
        content: " Please Wait...",
        spinner: 'bubbles',
        duration: 2000,
      });
      loginLoadingController.present();
    }
    
    catch(e){
      this.toast.create({
        message: "Invalid ID or password",
        duration: 3000,
        cssClass: "error"
      }).present();
    }

   
    
    
}

  closePage(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecloginPage');
  }

  goTo(){
    this.navCtrl.setRoot('LecrequestPage');
  }

}
