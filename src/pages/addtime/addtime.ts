import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Timetable } from '../../models/timetable';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the AddtimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtime',
  templateUrl: 'addtime.html',
})
export class AddtimePage {

  timetable = {} as Timetable;
  subjectListRef$: Observable<any>
  groupListRef$: Observable<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,) {
  }

  ionViewDidLoad() {
    this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();  
    this.groupListRef$ = this.afDatabase.list(`group`).valueChanges();  
    console.log('ionViewDidLoad AddtimePage');
  }

 updateTime(){
  this.afAuth.authState.take(1).subscribe(auth => {
    this.afDatabase.object(`timetable/${auth.uid}`).set(this.timetable)
    .then(() => this.navCtrl.setRoot('LecTimetablePage'));
  })
 } 

}
