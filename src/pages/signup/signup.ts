import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {
    email: '',
    password: '',
   
  }
  username: string ='';
  
  constructor(private fireAuth: AngularFireAuth, 
    private toast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userservice: UserProvider,
    public loadingCtrl: LoadingController,
    ) {
  }

  async signup(user: User){
    try{
      const info = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res=> {
        this.navCtrl.setRoot('UpdateprofPage');
      });
    //var toaster = this.toastCtrl.create({
  ////    duration: 3000,
    //  position: 'bottom'
  //  });
   // if (this.user.email == '' || this.user.password == '') {
  //    toaster.setMessage('All fields are required!');
  //    toaster.present();
   // }
  //  else if (this.user.password.length < 7) {
  //    toaster.setMessage('Password is not strong. Try giving more than six characters');
  //    toaster.present();
  //  }
  //  else {
    //  let loader = this.loadingCtrl.create({
    //    content: 'Please wait'
    //  });
    //  loader.present();
    //  this.userservice.adduser(this.user).then((res: any) => {
     //   loader.dismiss();
    //    if (res.success)
     //    this.navCtrl.setRoot('UpdateprofPage');
     //   else
     //     alert('Error' + res);
     // })
  //  }

    

    }
  




    catch(e){
      this.toast.create({
        message: "All fields are required! Password MUST be at least 6 alphanumeric characters",
        duration: 4000,
        cssClass: "error"
      }).present();
    }

 }
}





  
    
  



