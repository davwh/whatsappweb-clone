import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAo0_M_JahJqtjLbxppJOqBYVTSGFe5sn8",
    authDomain: "whatsapp-clone-924f2.firebaseapp.com",
    projectId: "whatsapp-clone-924f2",
    storageBucket: "whatsapp-clone-924f2.appspot.com",
    messagingSenderId: "139064750213",
    appId: "1:139064750213:web:fbefba86ba6407ba85b9ec"
  };
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

 
 const db = firebaseApp.firestore();
 const auth = firebaseApp.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 const createTimestamp = firebase.firestore.FieldValue.serverTimestamp; 
 const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

 export {
    db,
    auth,
    provider,
    createTimestamp,
    serverTimestamp
 }