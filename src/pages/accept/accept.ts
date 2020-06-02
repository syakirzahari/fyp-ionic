import { Component, OnInit } from '@angular/core';
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
import * as _ from 'lodash';

/**
 * Generated class for the AcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html',
})
export class AcceptPage implements OnInit {

  
  //arrData = []
  //appointment = {} as Appointment;
  profile: Profile;
  appointment: Appointment;
 //appointmentRef$ : Observable <any>
  public searchControl: FormControl;
   public items: any;
  appointmentRef$ : Observable <Appointment[]>
  profileData: Observable<any>
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    //private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    private appointment1: AppointmentService,
    platform: Platform
   // private dataService: DataService
    ) {
 //     this.afAuth.authState.take(1).subscribe(data => {
 //       if (data && data.email && data.uid ) {
  //      this.appointmentRef$ = this.afDatabase.list(`appointment/`).valueChanges();
      
  //    this.appointmentRef$.subscribe(x => console.log(x));
   //  }
   //});

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
    })

   
    let backAction =  platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    },2)

  }

  filters = {}
  filteredAccepted: any;
  name: string;
  accepted1:any;


  ngOnInit() {
    this.afDatabase.list('/accepted').valueChanges()
    .subscribe(accepted1 => {
      this.accepted1 = accepted1;
      this.applyFilters()
  })
  }

  private applyFilters() {
    this.filteredAccepted = _.filter(this.accepted1, _.conforms(this.filters) )
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
    
   // this.afAuth.authState.take(1).subscribe( data => {
   //   if (data && data.email && data.uid ) {
   //    this.appointmentRef$ = this.afDatabase.object(`appointment`).valueChanges();
   //   }
   //})
  
    console.log('ionViewDidLoad CbookPage');
  }

  editApp(){
    this.navCtrl.push('EditAppPage');
  }



}
