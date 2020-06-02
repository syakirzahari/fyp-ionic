import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { Appointment } from '../../models/appointment';
import { Accepted } from '../../models/accepted';
import { AcceptedService } from './../../services/accepted/accepted.service';


/**
 * Generated class for the PromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prompt',
  templateUrl: 'prompt.html',
})
export class PromptPage {

  appointment: Appointment;
  accepted: Accepted;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private appointment1: AppointmentService,
    private accepted1: AcceptedService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromptPage');
  }

  ionViewWillLoad(){
   // this.appointment = this.navParams.get('accepted');
    this.accepted = this.navParams.get('accepted');
    }

  cancelApp(){
    this.navCtrl.pop();
  }

  doneApp(accepted: Accepted){
    this.accepted1.addItem(accepted).then(ref => {
      this.navCtrl.setRoot("HistoryPage");
    });

    this.accepted1.removeItem(accepted)
   .then(() => {
     this.navCtrl.setRoot("HistoryPage");
    });

 
  }


} 
   


