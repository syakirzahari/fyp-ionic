import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { Lecturer } from '../../models/lecturer';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-leceditprof',
  templateUrl: 'leceditprof.html',
})
export class LeceditprofPage {

  profileData: Observable<any>
  lecturer = {} as Lecturer;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,) {

      this.afAuth.authState.take(1).subscribe( data => {
        if (data && data.email && data.uid ) {
          const profileData = this.navParams.get(`data.uid`);
          console.log(data.uid);

          this.profileData = this.afDatabase.object(`/lecturer/${data.uid}`).valueChanges();

          this.profileData.subscribe(
            lecturer => this.lecturer = lecturer);
          
         }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeceditprofPage');
  }

  updateProfile(){
 
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`lecturer/${auth.uid}`).update(this.lecturer)
      .then(() => this.navCtrl.pop());
    });

  }

}
