import { config } from "./chatkey.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const database = getDatabase();
const chat = document.getElementById("chat");
const displayChats = document.getElementById("disChat");

let index;
let emailArr;
let email1;
let chatId;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log(user);
    let name = user.displayName;
    let email = user.email;
    loggedInUser.innerText = name;
    const uid = user.uid;
    email1 = email;
    saveUserDetails(name, email, uid);
  } else {
    location.href = "index.html";
  }
});

function saveUserDetails(name, email, uid) {
  const userId = uid;
  const usersRef = ref(database, "users/" + userId);
  set(
    usersRef,
    {
      name: name,
      email: email,
      // signupDate: firebase.database.ServerValue.TIMESTAMP,
    },
    (error) => {
      if (error) {
        console.error("Failed to save user details:", error);
      } else {
        console.log("User details saved successfully!");
      }
    }
  );
}

// function repId(email) {
//   email.replace(/[.#$[\]]/g, "_")
// }

window.getChatId = function (element) {
  emailArr = [];
  let email2 = element.querySelector(".ceid").innerText;
  let topName = element.querySelector(".tdna").innerText;
  let disTopName = document.getElementById("witw");
  disTopName.innerText = topName;

  emailArr.push(email1, email2);
  emailArr.sort();
  console.log(emailArr);
  chatId = emailArr.join("_").replaceAll(/[.#$[\]]/g, "1");
  console.log(chatId);
  loadMessages();
};

let dbref = ref(database, "users");
onValue(dbref, (res) => {
  let data = res.val();
  // console.log(data);

  if (data) {
    showUser.innerHTML = "";
    Object.keys(data).forEach((key) => {
      // console.log(data[key].name);
      showUser.innerHTML += `<hr>
                             <div class="usdiv" onclick="getChatId(this)">
                               <h3 class="tdna"> ${data[key].name}</h3>
                               <div class="ceid">${data[key].email}</div>
                             </div>`;
    });
  }
});

document.getElementById("signOut").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Sign out successful");
      location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

chat.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMssg();
  }
});

document.getElementById("sendChat").addEventListener("click", sendMssg);

function sendMssg() {
  let date = new Date();
  let chats = {
    message: chat.value,
    time: date.toLocaleTimeString(),
    user: auth.currentUser.displayName,
    userId: auth.currentUser.uid,
  };

  // let userId = auth.currentUser.uid;
  // console.log(userId);

  if (chatId) {
    // console.log(chats);
    const dbref = ref(database, "chat/" + chatId + "/messages");
    const newDbref = push(dbref);
    set(newDbref, chats);
    lastMessage(displayChats);
    chat.value = "";
  } else {
    console.log("cant send");
  }

  loadMessages();
  //OR
  // set(ref(database, "chatHistory"), chats);
}

function loadMessages() {
  if (chatId) {
    let dbref = ref(database, "chat/" + chatId + "/messages");
    onValue(dbref, (res) => {
      let messages = res.val();
      // console.log(messages);
      displayChats.innerHTML = "";
      if (messages) {
        // displayChats.innerHTML = "";
        for (let messageId in messages) {
          let message = messages[messageId];
          const messageDiv = document.createElement("div");
          messageDiv.classList.add("mssgbody");
          if (message.userId === auth.currentUser.uid) {
            messageDiv.classList.add("mssg-sent");
          } else {
            messageDiv.classList.add("mssg-received");
          }
          messageDiv.innerHTML = `
                               <h3> ${message.message}</h3>
                               <p class="tmi"> ${message.time}</p>`;
          displayChats.appendChild(messageDiv);
          lastMessage(displayChats);
        }
      } else {
        const sndDiv = document.createElement("div");
        sndDiv.classList.add("cent");
        sndDiv.innerText = "Send a message";
        displayChats.appendChild(sndDiv);
      }
    });
  } else {
    const iniDiv = document.createElement("div");
    iniDiv.classList.add("cent");
    iniDiv.innerText = "Initiate a chat";
    displayChats.appendChild(iniDiv);
  }
}

loadMessages();

function lastMessage(element) {
  element.scrollTop = element.scrollHeight;
}
