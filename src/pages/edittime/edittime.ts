import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, normalizeURL } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Timetable } from '../../models/timetable';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseService } from './../../services/firebase.service';


/**
 * Generated class for the EdittimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edittime',
  templateUrl: 'edittime.html',
})
export class EdittimePage {

  timetableData: Observable<any>
  timetable = {} as Timetable;
  subjectListRef$: Observable<any>
  groupListRef$: Observable<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public firebaseService: FirebaseService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

      this.afAuth.authState.take(1).subscribe( data => {
        if (data && data.email && data.uid ) {
          const timetableData = this.navParams.get('data.uid');
          console.log(data.uid);

          this.timetableData = this.afDatabase.object(`/timetable/${data.uid}`).valueChanges();

          this.timetableData.subscribe(
            timetable => this.timetable = timetable);
          
         }
      })
  }

  ionViewDidLoad() {
      this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();  
      this.groupListRef$ = this.afDatabase.list(`group`).valueChanges();  

    console.log('ionViewDidLoad EdittimePage');
  }

  updateTime(){

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`timetable/${auth.uid}`).update(this.timetable)
     .then(() => this.navCtrl.pop());
    });
  }

}
