import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import * as firebase from 'firebase/app';
import { AppointmentService } from './../../services/appointment/appointment.service';
import 'rxjs/add/operator/map';
import { FormControl } from "@angular/forms";
//import { DataService } from "../services/data.service";
import { debounceTime } from "rxjs/operators";
import { Profile } from '../../models/profile';


/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  profile: Profile;
  appointment: Appointment;
  public searchControl: FormControl;
   public items: any;
  appointmentRef$ : Observable <Appointment[]>
  profileData: Observable<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private appointment1: AppointmentService,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    platform: Platform) {

      this.afAuth.authState.take(1).subscribe( data => {
        if (data && data.email && data.uid) {
         
       this.appointmentRef$ = this.appointment1
       .getAppointmentList1()
       .snapshotChanges()
       .map(changes => {
           return changes.map(c => ({
             key: c.payload.key, 
             ...c.payload.val(),
               })); 
            });
          }  

        //  var query = firebase.database().ref('history').orderByChild('lecturer').equalTo('lecturer/${data.uid}/name');
       //   query.once('value', function (snapshot) {
       //      console.log(snapshot.val()) //contains all users that has apply as true
      //    })

        })

      

        let backAction =  platform.registerBackButtonAction(() => {
          console.log("second");
          this.navCtrl.pop();
          backAction();
        },2)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
