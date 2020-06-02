import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Gesture, Content, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  profileData: Observable<any>
  timetableData: Observable<any>
  timetableData1: Observable<any>


  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth, platform: Platform) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`lecturer/${data.uid}`).valueChanges();
       this.timetableData = this.afDatabase.object(`timetable/${data.uid}`).valueChanges();
       this.timetableData1 = this.afDatabase.object(`group/${data.uid}`).valueChanges();
      }
    })
    console.log('ionViewDidLoad ViewPage');
  }

  openPage(){
    this.navCtrl.push('LecTimetablePage');
  }

  editTime(){
    this.navCtrl.push('EdittimePage');
  }

}
