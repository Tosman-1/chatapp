// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
// import {
//   getDatabase,
//   ref,
//   set,
// } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOSTSW1EjL3UUgyIJTFX1QsKsnLwz-8TA",
  authDomain: "newproject-2f9f1.firebaseapp.com",
  databaseURL: "https://newproject-2f9f1-default-rtdb.firebaseio.com",
  projectId: "newproject-2f9f1",
  storageBucket: "newproject-2f9f1.appspot.com",
  messagingSenderId: "198300522152",
  appId: "1:198300522152:web:34da01c1f57def3f9c949d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

// const database = getDatabase();

let signInWg = document.getElementById("signinwg");

let myName = document.getElementById("showname");

signInWg.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((response) => {
      console.log(response);
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
