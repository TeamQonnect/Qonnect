const aside = document.getElementById('asideMenu');
const searchBar = document.getElementById('searchBar');
const search2 = document.getElementById('search2');
const ask = document.getElementById('ask');

let currentOption = 1;
let isLoggedIn = (window.localStorage.getItem("QonnectUserLogIn") === "true");

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
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, deleteField, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

import { showPrompt, hidePrompt, removeItem } from "./viewHandler.js";

window.showPrompt = showPrompt;
window.hidePrompt = hidePrompt;
window.removeItem = removeItem;


var app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const params = new URLSearchParams(window.location.search);
const qid = params.get('id');

const error = document.getElementById("error");
let votes = [];
let comments = [];

let container = document.getElementById("dataContainer");
document.getElementById('postQuestion').innerHTML = (isLoggedIn) ? 'Post Comment' : "Login to Comment";

if (!qid || qid === null || qid === undefined) {
  error.style.display = 'flex';
  document.getElementById('contentPlace').style.display = 'none';
  document.getElementById("errorI").src = './media/profiles/10.png';
  document.getElementById('errorText').innerHTML = `Question not found <br>Go to <a href="question.html">Home Page</a>`;
}else{
  document.getElementById('contentPlace').style.display = 'flex';
  const docRef = doc(db, "questions", qid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    error.style.display = 'none';
    document.getElementById('question').innerHTML = docSnap.data().question;
    document.getElementById('questionDescription').innerHTML = docSnap.data().description;
    document.getElementById('voteCount').innerHTML = docSnap.data().votes.length;
    document.getElementById('creditsLink').href = "index.html?by="+docSnap.data().user;
    document.getElementById('creditsLink').innerText = docSnap.data().name;
    document.getElementById('time').innerHTML = formatTimeDifference(docSnap.data().time) + ' ago';
    votes = docSnap.data().votes;
    comments = ((typeof( docSnap.data().comments)==="object") ? docSnap.data().comments : []);
    checkVote();
    commentsDisplay();

  } else {
    error.style.display = 'flex';
  document.getElementById('contentPlace').style.display = 'none';
    document.getElementById("errorI").src = './media/profiles/10.png';
    document.getElementById('errorText').innerHTML = `Question not found <br>Go to <a href="index.html">Home Page</a>`;
  }
}

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

document.getElementById('vote').addEventListener('click', ()=>{
  upvote(qid);
});

document.getElementById('gotIt').addEventListener('click', ()=>{
  hidePrompt(true, async (id, done)=>{
      if (done) {

        comments.splice(id, 1);

        const docRef = doc(db, "questions", qid);
        await updateDoc(docRef, {
            comments: comments,
            popularity: votes.length + comments.length
        }).then(()=>{
          commentsDisplay();
        });
      }
  });
});

document.getElementById('questionInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    addComment();
  }
});

document.getElementById('postQuestion').addEventListener('click', ()=>{

  addComment();

});

document.getElementById('report').addEventListener('click', ()=>{

  sendMail();

});

async function upvote(id) {

  document.getElementById(`vote`).classList.toggle('liked');

  if (!votes.includes(window.localStorage.getItem("QonnectUser"))) {
    
    votes.push(window.localStorage.getItem("QonnectUser"));
    //getQuestionsData(getCurrentGroupId())[index].likes.push(window.localStorage.getItem("QonnectUser"));
  }else{
    votes = votes.filter(obj => obj !== window.localStorage.getItem("QonnectUser")); // Removes object with id 2
    //getQuestionsData(getCurrentGroupId())[index].likes = filteredArray;
  }

  checkVote();

  document.getElementById('voteCount').innerHTML = votes.length;
  
  const docRef = doc(db, "questions", id);
  await updateDoc(docRef, {
      votes: votes,
      popularity: votes.length + comments.length
  });

  //document.getElementById(`likeSpan${id}`).innerHTML = getQuestionsData(getCurrentGroupId())[index].likes;
  // btn.innerHTML = `<i class="fas fa-heart liked" id="like${id}"></i>  ${questionsData[groupId][index].likes}`;
}

function checkVote(){
  if (votes.includes(window.localStorage.getItem("QonnectUser"))) {
    document.getElementById('vote').style.color = 'blue';
    document.getElementById('vote').style.color = 'blue';
  }else{
    document.getElementById('vote').style.color = 'gray';
  }
}

function commentsDisplay() {
  container.innerHTML = '';
  const email = window.localStorage.getItem("QonnectUser");
  rearrange(email);
  if (comments.length === 0) {
    document.getElementById('commentsCount').innerHTML = "";
    document.getElementById("noc").style.display = 'block';
    error.style.display = 'flex';
  } else {
    document.getElementById("noc").style.display = 'none';
    document.getElementById('commentsCount').innerHTML = comments.length;
    error.style.display = 'none';
    comments.forEach((q, index) => {
      if (q !== null && q !== undefined) {
        const div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
          <p class="name"><span style="color:orange;">•</span> ${(q.name) ? q.name : "Anonymous"}</p>
          <div class="postContent">
            <div class="post">
          <div class="content">
          ${q.comment}
          </div>
          <div class="question-actions">
          ${(email === q.user) ? `
            ${(q.user === email) ? `<button class="trash" onclick="showPrompt('Are you sure','Do you want to delete the post', 'trash.png', '${q.id}', ${index}, ${0})"><i class="fas fa-trash-alt"></i><i >Delete</i></button>` : ``}      
            `:
            ``
          }
            <p class="like" style="font-size: 0.7rem; color: #aaa;">${formatTimeDifference(q.time)} ago</p>
            
          </div>
        </div>
            </div>
          </div>
        `;
        container.appendChild(div);
      }
    });
  }
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

function rearrange(user){
  if (user !== "" && user !== null && user != undefined && comments !== null && comments !== undefined) {
    comments.sort((a, b) => {
        if (a.user === user) return -1; // Move object with id 2 to the top
        if (b.user === user) return 1;
        return 0;
    });
  }
}

async function addComment(){

  let text = document.getElementById('questionInput');

  if (!isLoggedIn) {
    window.location.href = "login.html";
  }else{
    if (text.value.trim() != "") {


      let comment = {

        name: window.localStorage.getItem("QonnectUserName"),
        user: window.localStorage.getItem("QonnectUser"),
        comment: text.value.trim(),
        time: String(new Date().getTime())

      };

      comments.push(comment);

      const docRef = doc(db, "questions", qid);
      await updateDoc(docRef, {
          comments: comments,
          popularity: votes.length + comments.length
      }).then(()=>{
        commentsDisplay();
      });

      document.getElementById('commentPrompt').innerHTML = "";
      text.value = '';
    }else{
      document.getElementById('commentPrompt').innerHTML = "Type something";
    }
  }
}

function sendMail() {
    var recipient = "teamqonnect10@gmail.com";
    var subject = "Reporting issue on ID: "+qid;
    var body = "Reporting on"+qid+': ';

    var mailtoLink = "mailto:" + recipient +
                     "?subject=" + encodeURIComponent(subject) +
                     "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
}