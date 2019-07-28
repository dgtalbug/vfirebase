import firebase from 'firebase'
import firestore from 'firebase/firestore'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCAIWZiz65UMnFFCZwP1WZSsfb36rUqtNM",
    authDomain: "todo-9b1e4.firebaseapp.com",
    databaseURL: "https://todo-9b1e4.firebaseio.com",
    projectId: "todo-9b1e4",
    storageBucket: "",
    messagingSenderId: "270475931964",
    appId: "1:270475931964:web:8d0644933958bc1f"
  };
  // Initialize Firebase
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebaseApp.firestore().settings({ timestampsInSnapshots: true})

  export default firebaseApp.firestore()