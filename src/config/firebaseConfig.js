import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBrS5WVuX2kMnMeq1RIDv1tt3uBZYD9Fhg",
    authDomain: "todo-hw3-a9147.firebaseapp.com",
    databaseURL: "https://todo-hw3-a9147.firebaseio.com",
    projectId: "todo-hw3-a9147",
    storageBucket: "todo-hw3-a9147.appspot.com",
    messagingSenderId: "516227633082",
    appId: "1:516227633082:web:077bceca71993340fcd783",
    measurementId: "G-SHGJDQDV6L"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;