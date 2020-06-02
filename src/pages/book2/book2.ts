import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user/user';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { Profile } from '../../models/profile';
/**
 * Generated class for the Book2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book2',
  templateUrl: 'book2.html',
})
export class Book2Page {

  profile = {} as Profile;
  

  appointment: Appointment = {
    name:'',
    group:'',
    code: '',
    lecturer: '',
    date: '',
    time: '',
    notes: '',
    status: 'Pending',
  }

  //appointment = {} as Appointment;
  subjectListRef$: Observable<any>
  groupListRef$: Observable<any>
  appointmentRef$: Observable<any>
  lecturerListRef$: Observable<any>
  temparr = [];
  filteredusers = [];
  profileData: Observable<any>


  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public userservice: UserProvider,
    public alertCtrl: AlertController,
    private appointment1: AppointmentService,){
    //private _changeDetectionRef : ChangeDetectorRef) {

      

      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;
     })
      
      this.afAuth.authState.take(1).subscribe(auth => {
        this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();
        this.groupListRef$ = this.afDatabase.list(`group`).valueChanges();
        this.lecturerListRef$ = this.afDatabase.list(`lecturer`).valueChanges();
        this.profileData = this.afDatabase.list(`profile`).valueChanges();
      })

     
  }

  ionViewDidLoad() {

    this.afAuth.authState.take(1).subscribe( data => {
      if (data && data.email && data.uid ) {
       this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }
    })

    let loginLoadingController = this.loadingController.create({
      content: " Updating Data ",
      spinner: 'bubbles',
      duration: 2000,
    });
    loginLoadingController.present();
    console.log('ionViewDidLoad Book2Page');
  }


  addItem(appointment: Appointment){
     if (this.appointment.name == "" || this.appointment.group == "" || this.appointment.code == ""|| this.appointment.lecturer == "" || this.appointment.time == "" 
    || this.appointment.date == "" || this.appointment.notes == "") {
      const alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "Please fill in all fields",
        buttons: ["OK"]
      });
      alert.present();
      } 
      else {
      this.appointment1.addItem(appointment).then(ref => {
        this.navCtrl.setRoot('ConfirmPage', { key: ref.key});
      });

      
  }

  

  
  
}

goPage(){
  this.navCtrl.push('RandomPage');
}
  

}
