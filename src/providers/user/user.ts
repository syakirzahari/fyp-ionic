import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  constructor(public afireauth: AngularFireAuth) {
  }

  adduser(user) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
    
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  
updateimage(imageurl) {
  var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl      
      }).then(() => {
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
          }).then(() => {
              resolve({ success: true });
              }).catch((err) => {
                  reject(err);
              })
      }).catch((err) => {
            reject(err);
         })  
  })
  return promise;
}

getallusers() {
  var promise = new Promise((resolve, reject) => {
    this.firedata.orderByChild('uid').once('value', (snapshot) => {
      let userdata = snapshot.val();
      let temparr = [];
      for (var key in userdata) {
        temparr.push(userdata[key]);
      }
      resolve(temparr);
    }).catch((err) => {
      reject(err);
    })
  })
  return promise;
}


}