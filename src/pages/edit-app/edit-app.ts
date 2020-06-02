import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppointmentService } from './../../services/appointment/appointment.service';


/**
 * Generated class for the EditAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-app',
  templateUrl: 'edit-app.html',
})
export class EditAppPage {

  appointment: Appointment;
  
  //profileData: Observable<any>
  //appointment = {} as Appointment;
  subjectListRef$: Observable<any>
  //appointmentRef$: Observable<any>
  lecturerListRef$: Observable<any>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private appointment1: AppointmentService
    ) {
    //  this.afAuth.authState.take(1).subscribe( data => {
     //   if (data && data.email && data.uid ) {
     //     const appointmentRef$ = this.navParams.get('data.uid');
      //    console.log(data.uid);

      //    this.appointmentRef$ = this.afDatabase.object(`appointment/${data.uid}`).valueChanges();

      //    this.appointmentRef$.subscribe(
       //     appointment => this.appointment = appointment);
          
       //  }
      //})
      
  }

  ionViewDidLoad() {
  //  this.afAuth.authState.take(1).subscribe(auth => {
      this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();
      this.lecturerListRef$ = this.afDatabase.list(`lecturer`).valueChanges();
    //})

   
   // console.log(this.navParams.get('appointment'));
  }

  ionViewWillLoad(){
    this.appointment = this.navParams.get('appointment');
    }


  updateApp1(appointment: Appointment){
    this.appointment1.editItem(appointment).then(() => {
      this.navCtrl.setRoot('CbookPage');
    });

    this.appointment1.addItem1(appointment).then(ref => {
      this.navCtrl.setRoot("AcceptPage");
    });

    this.appointment1.removeItem(appointment)
    .then(() => {
    this.navCtrl.setRoot('CbookPage');
     });
   
  }



  


}
