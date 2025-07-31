const tagInputContainer = document.getElementById('tag-input-container');
const aside = document.getElementById('asideMenu');
const searchBar = document.getElementById('searchBar');
const search2 = document.getElementById('search2');
const ask = document.getElementById('ask');

let currentOption = 1;

const firebaseConfig = {
  apiKey: "AIzaSyC2ZXOFbau1-_wqFAxJxanLTuAIiwbE8Yk",
  authDomain: "team-qonnect.firebaseapp.com",
  projectId: "team-qonnect",
  storageBucket: "team-qonnect.firebasestorage.app",
  messagingSenderId: "1081558162587",
  appId: "1:1081558162587:web:827837d1d3dbcdf1c8ba3e"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, signInWithPopup, getAdditionalUserInfo} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, runTransaction, ref, child, get, set, update, remove, goOffline } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);

updateName();

selectedOption();

document.getElementById('menu').addEventListener('click', function () {
  if (!aside.checkVisibility()) {
    aside.style.display = "flex";
  }else {
    aside.style.display = "none";
  }
});

document.getElementById('search2').addEventListener('click', function () {
  if (!searchBar.checkVisibility()) {
    searchBar.style.display = "flex";
    ask.style.display = "none";
    search2.style.display = "none";
  }else {
    searchBar.style.display = "none";
    ask.style.display = "flex";
    search2.style.display = "flex";
  }
});

ask.addEventListener('click', ()=> {
  window.location.href = "question.html";
});

document.getElementById('optionSwitch').addEventListener('click', () => {
  selectChoice();
});

document.getElementById('submit').addEventListener('click', () => {
  logOut();
});

function selectChoice(){
  if (currentOption == 1) {
    currentOption = 0;
  }else {
    currentOption = 1;
  }
  selectedOption();
}

function selectedOption(){

  if (currentOption == 1) {
    document.getElementById('errorText').innerHTML = `You asked no questions yet.<br>Have a doubt? <a href="question.html">Ask a question</a>`;
    document.getElementById('questionButton').classList.add('selectedItem');
    document.getElementById('repliesButton').classList.remove('selectedItem');
  }else{
    document.getElementById('errorText').innerHTML = `You have't replied to any questions yet.<br>Help peers with your suggestions <a href="index.html">Visit Home</a>`;
    document.getElementById('questionButton').classList.remove('selectedItem');
    document.getElementById('repliesButton').classList.add('selectedItem');
  }
}

function logOut(){
  signOut(auth).then(() => {
    window.localStorage.clear();
    window.location.replace('login.html');
  }).catch((error) => {
    showToast('Oops!! Please try again later');
  });
}

function updateName(){
  const user = auth.currentUser;
  if (window.localStorage.getItem("QonnectUserLogIn") === "false" || window.localStorage.getItem("QonnectUserLogIn") === null) {
    window.location.replace('login.html');
  }else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.localStorage.setItem("QonnectUser", user.email);
        window.localStorage.setItem("QonnectUserName", user.displayName);
        let randomInteger = getRandomInt(1, 10);
        document.getElementById('profile').src= "./media/profiles/"+randomInteger+".png";
        document.getElementById('username').innerHTML = user.displayName;
        document.getElementById('email').innerHTML = user.email;
      } else {
        // No user is signed in.
        console.log("No user signed in.");
      }
    });    
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

