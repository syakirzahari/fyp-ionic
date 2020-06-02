import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@IonicPage()
@Component({
  selector: 'page-discuss',
  templateUrl: 'discuss.html',
})
export class DiscussPage {

  profileData: Observable<any>
 


  username: string = '';
  message: string = '';
  messages: object[] = [];
  newmessage;
  //s;
  _chatSubscription;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController
    ) {
     this.afAuth.authState.take(1).subscribe( data => {
        if (data && data.email && data.uid ) {
        this.username = this.navParams.get('username');
         

        this._chatSubscription = this.afDatabase.list('/chat').valueChanges().subscribe( data => {
          this.messages = data;
          });
        }
        
      })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussPage');
    this.afDatabase.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    })
  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.afDatabase.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has left the room`
    })

  }

  sendMessage(){
    //this.afAuth.authState.take(1).subscribe( data => {
      //if (data && data.email && data.uid ) {
            this.afDatabase.list('/chat').push({
             
             username: this.username,
             message: this.message
              }).then ( () =>{

              }).catch( () => {

              });
                this.message = '';

            }

   
  }


              
                

                
        
    //})

  

//}
