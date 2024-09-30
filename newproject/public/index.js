import { config } from "./chatkey.js";

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
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
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
