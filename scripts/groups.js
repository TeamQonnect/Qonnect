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
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, deleteField, Timestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

import { enterGroup, updateList, setData, removeItem, showPrompt, hidePrompt, getReplyingTo, getCurrentGroupId, likeQuestion, replyToQuestion, cancelReply, getData } from '../scripts/groupHandler.js';

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const rdb = getDatabase(app);
const db = getFirestore(app);

const groups = [
  { id: 'gate', name: 'GATE ', intro: 'This group is for all students preparing for GATE . Share strategies, resources, and doubts related to the exam.' },
  { id: 'upsc', name: 'UPSC ', intro: 'Welcome to the UPSC group! Discuss NCERTs, current affairs, optional subjects, and interview prep.' },
  { id: 'neet', name: 'NEET ', intro: 'Preparing for NEET? Ask doubts, share tricks, or suggest best books and mock tests.' },
  { id: 'cat', name: 'CAT ', intro: 'For all MBA dreamers. Talk about VARC, DILR, Quant, mocks, and college cutoffs.' },
  { id: 'ssc', name: 'SSC CGL', intro: 'This is your space for SSC CGL preparation — Quant tricks, English, reasoning and more.' }
];

window.enterGroup = enterGroup;
window.updateList = updateList;
window.getCurrentGroupId = getCurrentGroupId;
window.likeQuestion = likeQuestion;
window.replyToQuestion = replyToQuestion;
window.cancelReply = cancelReply;
window.getReplyingTo = getReplyingTo;
window.getData = getData;
window.setData = setData;
window.showPrompt = showPrompt;
window.hidePrompt = hidePrompt;
window.removeItem = removeItem;

const aside = document.getElementById('asideMenu');
const searchBar = document.getElementById('searchBar');
const search2 = document.getElementById('search2');

document.getElementById('questionInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    postQuestion();
  }
});

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

document.getElementById('submit').addEventListener('click', function(event) {
  postQuestion();
});

document.getElementById('cancelPrompt').addEventListener('click', function(event) {
  hidePrompt(false);
});

document.getElementById('goBack').addEventListener('click', function(event) {
  goBack();
});



function loadGroups() {
  const list = document.getElementById("groupList");
  groups.forEach(group => {
    const div = document.createElement("div");
    div.className = "group-card";
    div.innerHTML = `
      <h4>${group.name}</h4>
      <button onclick="getData('${group.id}')">Explore <i class="fas fa-play"></i></button>
    `;
    list.appendChild(div);
  });
}


async function postQuestion() {

  if (window.localStorage.getItem("QonnectUserLogIn") === "false" || window.localStorage.getItem("QonnectUserLogIn") === null) {
      //showPopup("Almost there", "Login to Post A Question", "cute.png");
      console.log('error');
  }else {
    const input = document.getElementById("questionInput");
    let text = input.value.trim();
    if (review(text) && window.localStorage.getItem("QonnectUser") !== "") {
          
      document.getElementById('postPrompt').innerText = "";
      if (!text) {
        document.getElementById('postPrompt').innerText = "Please type something.";
        return;
      }

      // 1. Convert http(s):// links
      text = text.replace(/(\bhttps?:\/\/[^\s]+)/gi, function (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
      });

      // 2. Convert www. links (not preceded by http)
      text = text.replace(/(^|[^\/])(www\.[^\s]+)/gi, function (_, prefix, url) {
        const fullUrl = `http://${url}`;
        return `${prefix}<a href="${fullUrl}" target="_blank">${url}</a>`;
      });

      // 3. Convert email addresses
      text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi, function (email) {
        return `<a href="mailto:${email}">${email}</a>`;
      });

      let name = window.localStorage.getItem("QonnectUserName");
      let email = window.localStorage.getItem("QonnectUser");

      if (!name) {
        name = "Team Qonnect";
      }

      let time = new Date().getTime();

      const newQuestion = {id:'', replyTo: getReplyingTo(), time, email, name, text, likes: []};

      const docRef = doc(collection(db, getCurrentGroupId()));

      let docID = docRef.id;

      newQuestion['id'] = docID;

      await setDoc(docRef, newQuestion).then(()=>{
        input.value = '';
      })
      .catch((error)=>{
        console.log('Error'+error);
      });
    }
  }
}

function review(text) {
  return true;
}

function getDate(dateStamp) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const d = new Date();
  d.setTime(parseInt(dateStamp));

  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return `${date}-${month.toUpperCase()}-${year}`;
}

function goBack() {
  document.getElementById("groupDetails").classList.add("hidden");
  document.getElementById("groupList").classList.remove("hidden");
  setData([]);
}

loadGroups();
getData('gate');
// enterGroup('gate');
