import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform  } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Timetable } from '../../models/timetable';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

/**
 * Generated class for the StudtimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-studtime',
  templateUrl: 'studtime.html',
})
export class StudtimePage implements OnInit {

  timetable = {} as Timetable;
  timeListRef$ : Observable<any>
  lecturerListRef$: Observable<any>
  public items: any = [];
 


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase, private modal: ModalController, platform: Platform) {
      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2)

     
  }

  filters = {}
  filteredLecturers: any;
  name: string;
  timetable1:any;
  m: string;
  
 

  ngOnInit() {
    this.afDatabase.list('/timetable').valueChanges()
    .subscribe(timetable1 => {
      this.timetable1 = timetable1;
      this.applyFilters()
  })

  
  }


  private applyFilters() {
    this.filteredLecturers = _.filter(this.timetable1, _.conforms(this.filters) )
  }

  /// filter property by equality to rule
  filterRule(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }

  filterExact1(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }


  removeRule(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }


  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.timeListRef$ = this.afDatabase.list(`timetable`).valueChanges();
      
      this.timeListRef$.subscribe(x => console.log(x));
      });

      this.lecturerListRef$ = this.afDatabase.list(`lecturer`).valueChanges();
    console.log('ionViewDidLoad StudtimePage');
  }

}
