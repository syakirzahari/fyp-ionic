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
/**
 * Generated class for the RandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-random',
  templateUrl: 'random.html',
})
export class RandomPage {

  appointment: Appointment = {
    name: '',
    group: '',
    code: '',
    lecturer: '',
    date: '',
    time: '',
    notes: '',
    status: '',
  }

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
    private appointment1: AppointmentService) {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.subjectListRef$ = this.afDatabase.list(`subject`).valueChanges();
        this.groupListRef$ = this.afDatabase.list(`group`).valueChanges();
        this.lecturerListRef$ = this.afDatabase.list(`lecturer`).valueChanges();
        this.profileData = this.afDatabase.list(`profile`).valueChanges();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RandomPage');
  }

  pickLec(code: string){
    this.lecturerListRef$ = this.afDatabase.list('lecturer', 
    ref => ref.orderByChild('preferred').equalTo(code)).valueChanges();
  }

}
