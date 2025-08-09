
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

import { getData, isLoggedIn, showPrompt, hidePrompt, removeItem } from '../scripts/indexHandler.js';


var app = initializeApp(firebaseConfig);			

const auth = getAuth(app);

window.getData = getData;
window.isLoggedIn = isLoggedIn;
window.showPrompt = showPrompt;
window.hidePrompt = hidePrompt;
window.removeItem = removeItem;

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
    getData(0);
  }else{
    document.getElementById('errorText').innerHTML = `You have't replied to any questions yet.<br>Help peers with your suggestions <a href="index.html">Visit Home</a>`;
    document.getElementById('questionButton').classList.remove('selectedItem');
    document.getElementById('repliesButton').classList.add('selectedItem');
    getData(1);
  }
}

getData();

