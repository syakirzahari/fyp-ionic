import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-username',
  templateUrl: 'username.html',
})
export class UsernamePage {

  username: string ='';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsernamePage');
  }

  alert(title, message: string){
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }

  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      this.navCtrl.push('DiscussPage', {
        username: this.username,
      })

    } else {
      this.alert('Error','Invalid Username');
    }

  }

}
