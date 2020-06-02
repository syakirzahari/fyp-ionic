import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';



@Injectable()
export class FcmProvider {

  constructor(
    public afs: AngularFirestore,
    public firebaseNative: Firebase,
    private platform: Platform
  ) {}

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    } 
  
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    } 
    
    return this.saveTokenToFirestore(token)
   }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')
  
    const docData = { 
      token,
      userId: 'testUser',
    }
  
    return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}