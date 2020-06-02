import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, Platform} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import { Accepted } from '../../models/accepted';
import firebase from 'firebase';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@IonicPage()
@Component({
  selector: 'page-cbook',
  templateUrl: 'cbook.html',
})
export class CbookPage implements OnInit {
  

  // arrData = []
  // appointment = {} as Appointment;
  //  accepted = {} as Accepted;
  appointmentRef$ : Observable <Appointment[]>;
  lecturerListRef$ : Observable <any>


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    //private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modal: ModalController,
    private appointment1: AppointmentService,
    platform: Platform
    ){
    //  this.afAuth.authState.take(1).subscribe(auth => {
    //  this.appointmentRef$ = this.afDatabase.list(`appointment`).valueChanges();
      
    //  this.appointmentRef$.subscribe(x => console.log(x));
    //  });
    this.appointmentRef$ = this.appointment1
    .getAppointmentList()
    .snapshotChanges()
    .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, 
          ...c.payload.val(),
        })); 
      });

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)
    
  }
      
  filters = {}
  filteredApp: any;
  lecturer: string;
  appointment:any;
  
  ngOnInit() {
    this.afDatabase.list('/appointment').valueChanges()
    .subscribe(appointment => {
      this.appointment = appointment;
      this.applyFilters()
  })
  }

  private applyFilters() {
    this.filteredApp = _.filter(this.appointment, _.conforms(this.filters) )
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }
     
    
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CbookPage');
  }

  acceptApp() {
   // this.afAuth.authState.take(1).subscribe(auth => {
  //    this.appointmentRef$ = this.afDatabase.list(`accepted`).valueChanges();
      
   //   this.appointmentRef$.subscribe(x => console.log(x));
   //   });
   
  
  }

  removeItem(appointment: Appointment){
   this.appointment1.removeItem(appointment)
   .then(() => {
   this.navCtrl.setRoot('LecHomePage');
    });
  }

  acceptApp1(appointment: Appointment){
    this.navCtrl.push('EditAppPage');
  }

  openPage(){
    this.navCtrl.push('EditAppPage');
  }
    
}

