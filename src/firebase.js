import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  // firebse configs
};

firebase.initializeApp(firebaseConfig);

export default firebase;
