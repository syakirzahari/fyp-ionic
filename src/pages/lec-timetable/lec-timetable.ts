import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Gesture, Content, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
/**
 * Generated class for the LecTimetablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lec-timetable',
  templateUrl: 'lec-timetable.html',
})
export class LecTimetablePage {
  @ViewChild(Content) content: Content;
  @ViewChild('zoom') zoom: ElementRef;

  profileData: Observable<any>
  timetableData: Observable<any>
  //private boolean: isPageVisible = false;
  //sampledata: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth, platform: Platform) {
    
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       //this.profileData = this.afDatabase.object(`lecturer/${data.uid}`).valueChanges();
       this.timetableData = this.afDatabase.object(`timetable/${data.uid}`).valueChanges();
       //this.timetableData = this.afDatabase.object(`group/${data.uid}`).valueChanges();
      }
    })
    console.log('ionViewDidLoad LecTimetablePage');
  }

  editTime(){
    this.navCtrl.push('EdittimePage');
  }

  openPage(){
    this.navCtrl.push('ViewPage');
  }

  addTime(){
    
    this.navCtrl.push('AddtimePage');
  }


 

  

}
