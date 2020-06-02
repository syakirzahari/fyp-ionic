import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { AcceptedService } from './../../services/accepted/accepted.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past',
  templateUrl: 'past.html',
})
export class PastPage implements OnInit {

  appointment: Appointment;
  appointmentRef$ : Observable <Appointment[]>
  profileData: Observable<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private appointment1: AppointmentService,
    private accepted1: AcceptedService,
    platform: Platform
    ) {

    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid) {
       
     this.appointmentRef$ = this.appointment1
     .getAppointmentList2()
     .snapshotChanges()
     .map(changes => {
         return changes.map(c => ({
           key: c.payload.key, 
           ...c.payload.val(),
             })); 
          });
        }  
      })

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)
 
  }

  filters = {}
  filteredhistory: any;
  name: string;
  history1:any;

  ngOnInit() {
    this.afDatabase.list('/history').valueChanges()
    .subscribe(history1 => {
      this.history1 = history1;
      this.applyFilters()
  })
  }

  private applyFilters() {
    this.filteredhistory = _.filter(this.history1, _.conforms(this.filters) )
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }


  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }
    })
    console.log('ionViewDidLoad PastPage');
  }

}
