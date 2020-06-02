import { Component } from '@angular/core';
import { NavParams, NavController, IonicPage, ToastController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  public login = [];
  user = {} as User;

  constructor(
    private fireAuth: AngularFireAuth, 
    private toast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private view: ViewController,
    public loadingController: LoadingController,
    platform: Platform) {

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)
  }

  async depan(user: User){
    // try{
    //   const info = await this.fireAuth.auth.signInWithEmailAndPassword(user.email +'@isiswa.uitm.edu.my', user.password);

    //   if(info){
        await this.navCtrl.setRoot('TabsPage',);
      // }

    //   let loginLoadingController = this.loadingController.create({
    //     content: " Please Wait...",
    //     spinner: 'bubbles',
    //     duration: 2000,
    //   });
    //   loginLoadingController.present();
    // }
    
    // catch(e){
    //   this.toast.create({
    //     message: "Invalid ID or password",
    //     duration: 3000,
    //     cssClass: "error"
    //   }).present();
    // }

  }
  

  

  signup(){
    this.navCtrl.push('SignupPage')
  }

  reset(){
    this.navCtrl.push('ResetPage')
  }

  closePage(){
    this.view.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}