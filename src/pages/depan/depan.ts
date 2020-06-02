import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the DepanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-depan',
  templateUrl: 'depan.html',

})


export default class DepanPage {

  profileData: Observable<any>


  constructor( public navCtrl: NavController, 
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) { 

 
  }

  profpage(){
    this.navCtrl.push('ProfilePage');
  }

  histpage(){
    this.navCtrl.push('StatusPage');
  }

  hist1page(){
    this.navCtrl.push('PastPage');
  }

  statpage(){
    this.navCtrl.push('AcceptPage');
  }

  timepage(){
    this.navCtrl.push('StudtimePage');
  }

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }
    })
   }

  
}
