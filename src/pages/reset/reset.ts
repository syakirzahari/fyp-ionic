import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { IonicPage, NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-reset-',
  templateUrl: 'reset.html',
})
export class ResetPage {
    public resetPasswordForm;


    constructor(public fireAuth: AngularFireAuth, 
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        platform: Platform) {

        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        })

        let backAction =  platform.registerBackButtonAction(() => {
            console.log("second");
            this.navCtrl.pop();
            backAction();
          },2)
    }

    
    resetPassword() {
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        } else {
            this.fireAuth.auth.sendPasswordResetEmail(this.resetPasswordForm.value.email).then((user) => {
                let alert = this.alertCtrl.create({
                    message: "We just sent you a reset link to your email",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: () => {
                                this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();

            }, (error) => {
                var errorMessage: string = error.message;
                let errorAlert = this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                errorAlert.present();
            });
        }
    }
}

