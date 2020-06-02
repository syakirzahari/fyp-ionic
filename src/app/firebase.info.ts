export const FIREBASE_INFO = {

    apiKey: "AIzaSyBt1b4VaO0NgVHsD2UGnoLlzajc6aHl1jw",
    authDomain: "consultation-18b8d.firebaseapp.com",
    databaseURL: "https://consultation-18b8d.firebaseio.com",
    projectId: "consultation-18b8d",
    storageBucket: "consultation-18b8d.appspot.com",
    messagingSenderId: "951629332271"

};

export const snapshotToArray = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
        let item = element.val();
        item.key = element.key;
        returnArray.push(item);
    });
    return returnArray;
}