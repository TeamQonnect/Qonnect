
const groups = [
  { id: 'gate', name: 'GATE ', intro: 'This group is for all students preparing for GATE . Share strategies, resources, and doubts related to the exam.' },
  { id: 'upsc', name: 'UPSC ', intro: 'Welcome to the UPSC group! Discuss NCERTs, current affairs, optional subjects, and interview prep.' },
  { id: 'neet', name: 'NEET ', intro: 'Preparing for NEET? Ask doubts, share tricks, or suggest best books and mock tests.' },
  { id: 'cat', name: 'CAT ', intro: 'For all MBA dreamers. Talk about VARC, DILR, Quant, mocks, and college cutoffs.' },
  { id: 'ssc', name: 'SSC CGL', intro: 'This is your space for SSC CGL preparation — Quant tricks, English, reasoning and more.' }
];

const isLoggedIn = true; // Change to false to simulate guest mode

let currentGroupId = null;
let isReplying = false;
let replyingTo = null;

const questionsData = {
  gate: [],
  upsc: [],
  neet: [],
  cat: [],
  ssc: []
};

//{"id": "sdafasd", "email":"charancherry@gmail.com", "name":"Charan Cherry", "text":"dfghdh","likes":0,"replies":[]},{"id": "asdfasf", "email":"stylishcharan2@gmail.com", "name":"Charan Cherry", "text":"dfhgdfghdfgh","likes":0,"replies":[]},{"id":"asdfasdfasd", "email":"stylishcharan2@gmail.com", "name":"Charan Cherry", "text":"dfhdfghdfgh","likes":0,"replies":[]}

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
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, deleteField, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export async function getData(){
    
    const timestamp = new Date().getTime() - 24 * 60 * 60 * 1000; // 24 hours ago

    const db = getFirestore(app);
    const usersCollection = collection(db, currentGroupId);
    const q = query(usersCollection, where("time", ">=", timestamp), orderBy("time", "desc"));
    var querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length == 0){
        return [];
    }

    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
      try{
        if (doc.data()) {
          return doc.data();
        }
      }catch(err) {
      }
    });
    
    return [];

}

export function setData(data){
  questionsData = data;
}

export function enterGroup(groupId) {


  document.getElementById("groupList").classList.add("hidden");
  document.getElementById("groupDetails").classList.remove("hidden");

  const group = groups.find(g => g.id === groupId);
  document.getElementById("groupTitle").innerText = group.name;
  document.getElementById("groupIntro").innerText = group.intro;

  currentGroupId = groupId;
  setCurrentGroupId(groupId);

  const container = document.getElementById("questionsContainer");
  container.innerHTML = '';
  document.getElementById("askSection").classList.toggle("hidden", !isLoggedIn);
  document.getElementById("questionInput").value = '';

  let email = window.localStorage.getItem('QonnectUser');

  const questions = getQuestionsData(groupId);
  if (questions.length === 0) {
    container.innerHTML = `
      <div class="error" id="error">
        <div class="errorImg">
          <img src="./media/nothing.png" alt="Empty">
        </div>
        <div class="errorText">
          <h3 style="color: grey; font-weight: 400; text-align: center; font-size: 1rem;" id="errorText">No conversation yet.<br>Start conversation through the text box</h3>
        </div>
      </div>
    `;
  } else {
    questions.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question-box";
      div.innerHTML = `
        <p class="name"> <span style="color:orange;">•</span> ${q.name}</p>
        <div class="postContent">
          <div class="post" id="${q.id}">
            <p class="content">${q.text}</p>
            <div class="question-actions">
              ${isLoggedIn ? `
                <button class="like" onclick="likeQuestion('${groupId}', ${index}, this)"><i class="fas fa-heart" id="like${q.id}"></i> ${q.likes}</button>
                <button class="like" onclick="replyToQuestion('${groupId}', ${index})"><i class="fas fa-reply"></i></button>
                ${(q.email === email) ? `<button class="like" onclick="replyToQuestion('${groupId}', ${index})"><i class="fas fa-trash-alt"></i></button>` : ``}      
                <p class="like" style="font-size: 0.7rem; color: #aaa;">${formatTimeDifference(q.time)}</p>
                `:
                `<i>Login to like or reply</i>`
              }
            </div>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  }
}

export function updateList(newQuestion){
  document.getElementById('replyHead').innerHTML = `What's on your mind`;
  getData();
  questionsData[currentGroupId].unshift(newQuestion);
  enterGroup(currentGroupId); // Re-render
}

export function getCurrentGroupId(){
  return currentGroupId;
}

function setCurrentGroupId(groupId){
  currentGroupId = groupId;
}

export function likeQuestion(groupId, index, btn) {
  questionsData[groupId][index].likes += 1;
  btn.innerHTML = `<i class="fas fa-heart liked"></i>  ${questionsData[groupId][index].likes}`;
}

export function replyToQuestion(groupId, index) {
  isReplying = true;
  setReplyingTo(questionsData[groupId][index]);
  document.getElementById('replyHead').innerHTML = `Replying to <a href='#${replyingTo.id}'>@${replyingTo.name}</a> <span onclick="cancelReply()"><i class="fas fa-close"></i></span>`;
  // const reply = prompt("Enter your reply:");
  // if (reply) alert("Reply saved (feature under development)");
}

export function cancelReply(){
  isReplying = false;
  setReplyingTo(null);
  document.getElementById('replyHead').innerHTML = `What's on your mind`;
}

export function getReplyingTo(){
  return replyingTo;
}

export function setReplyingTo(replying) {
  replyingTo = replying;
}

function getQuestionsData(groupId){
  return questionsData[groupId];
}

function formatTimeDifference(pastTimestamp) {
  const now = Date.now();
  const diffMs = now - pastTimestamp;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (60 * 1000));
  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const years = Math.floor(days / 365);

  if (pastTimestamp === null || pastTimestamp === undefined) {
    return '';
  }

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 365) {
    return `${days}d`;
  } else {
    return `${years}y`;
  }

}
