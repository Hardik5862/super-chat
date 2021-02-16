import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBNFyJpO-b1AjxENaiw_6EUg11Hw4_NlnI",
  authDomain: "react-super-chat-460bb.firebaseapp.com",
  projectId: "react-super-chat-460bb",
  storageBucket: "react-super-chat-460bb.appspot.com",
  messagingSenderId: "327979888496",
  appId: "1:327979888496:web:e6ab1a6f4b2c688273a9b5",
  measurementId: "G-0D23RD4W6N",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
