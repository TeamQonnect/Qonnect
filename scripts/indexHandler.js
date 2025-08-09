
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
import { getFirestore, doc, getDoc, setDoc, limit, onSnapshot, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, deleteField, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
let data = [];
let deleteID = '';
let option = 0;
let index = 0;
let container = document.getElementById("dataContainer");
const error = document.getElementById("error");

const params = new URLSearchParams(window.location.search);
let sort = params.get('sort');


if (!sort) {
  window.location.replace('index.html?sort=latest');
}

document.getElementById(sort).classList.add('selected');

export async function getData(option){

		// setQuestionsData([{"time":"1754731099579","user":"stylishcharan2@gmail.com","name":"Charan Cherry","id":"GJXvhadP1NmPpoo1ncMA","question":"Hello","tags":["hello"],"description":"Helsdfohiildfhioholsdf ilowfo.h.efio;hhef io;ji;cri; qerp; uiop qwerio qweril;hl;wehiozdnk,iwrjioqwerynioyniopqweryniopqhljk.wetukrt jkuhkty8oyoqwty89yio tvukj rt jk qwetbyiobyioqwefby89iptvui..5t ioueryiiowetbyioioqwtweru8 8o uibyiowt89popr8&nbsp; o8e 89 u8o ;rtn8opupt89pu9p u890&nbsp; 90ru90 9' u90p[mr0p[er 9[&nbsp; &nbsp;-i0 werym-09[ey m9090ty 9 ty 9- i0ty i]-0 i0 -rt 9- rt i0 rt i-0 erur[","votes":[]}]);
		const usersCollection = collection(db, "questions");
		let q = null;

    if(sort === 'latest') {
     q = query(usersCollection, orderBy("time", "asc"), limit(10));
    }else if(sort === 'oldest'){
     q = query(usersCollection, orderBy("time", "desc"), limit(10));
    }else if (sort === 'popular') {
     q = query(usersCollection, orderBy("popularity", "desc"), limit(10));
    }else{
     q = query(usersCollection, limit(10));
    }

		var querySnapshot = await getDocs(q);

		setQuestionsData([]);
		querySnapshot.forEach((doc) => {
			try{
			  if (doc.data()) {
			    updateList(doc.data());
			  }
			}catch(err) {
			}
		});

		enterGroup(getQuestionsData(), 0);
}

export function isLoggedIn(){
	return (window.localStorage.getItem("QonnectUser") && window.localStorage.getItem("QonnectUserLogIn") === "true");
}

export function checkValidUser(str){
	var pattern = /^[a-zA-Z_0-9.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;      
    return str.match(pattern);    
}

export function updateList(newQuestion){
  if (newQuestion !== null && newQuestion !== undefined) {
    data.unshift(newQuestion);
  }
}

export function enterGroup(questions, opt) {
  container.innerHTML = '';
  const email = window.localStorage.getItem("QonnectUser");
  if (questions.length === 0) {
    error.style.display = 'flex';
  } else {  
    error.style.display = 'none';
    questions.forEach((q, index) => {
      if (q !== null && q !== undefined) {
        const div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
          <p class="name"><span style="color:orange;">•</span> ${(q.name) ? q.name : "Anonymous"}</p>
          <div class="postContent">
            <div class="post" id="${q.id}" onclick="window.location.href='view.html?id=${q.id}'">
					<p class="content-head">${q.question}</p>
					<div class="content">
					${(q.description.length > 500) ? `${(q.description).slice(0, 500)}...<br><a href='view.html?id=${q.id}'>Read more</a>` : q.description}
					</div>
					<div class="question-actions">
          <br>
					${isLoggedIn ? `
					  <button class="like"><i class="fas fa-arrow-up" id="like${q.id}"></i> <span id="likeSpan${q.id}"></span><i style="color:lightgray; font-style: normal;">${((typeof(q.votes)==="object") ? q.votes.length : q.votes)} votes</i></button>
					  <button class="like" onclick="window.location.href='view.html?id=${q.id}'"><i class="fas fa-comment"></i> <span id="likeSpan${q.id}"></span><i style="color:lightgray; font-style: normal;">${((typeof(q.comments)==="object") ? q.comments.length : (q.comments) ? q.comments : 0)} Comments</i></button>      
					  `:
					  `<i>Login to like or reply</i>`
					}
					<p class="like" style="font-size: 0.7rem; color: #aaa;">${formatTimeDifference(q.time)} ago</p>
			</div>
            </div>
          </div>
        `;
        container.appendChild(div);
      }
    });
  }
}

export function formatTimeDifference(pastTimestamp) {
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

export function getQuestionsData(){
	return data;
}

export function setQuestionsData(dataa){
	data = dataa;
}

export async function removeItem(id) {

  	let docRef;
	if (option === 0) {
  		docRef = doc(db, "questions", id);
	}else{
		docRef = doc(db, "replies", id);
	}

	try {
		await deleteDoc(docRef).then(() => {
			getQuestionsData().splice(index, 1);
			enterGroup(getQuestionsData(), option);
		});
	} catch (error) {
		console.error("Error removing document: ", error);
	}
}

export function showPrompt(message, body, image, id, idx, opt) {
  deleteID = id;
  index = idx;
  option = opt;
  document.getElementById("message").innerHTML = message;
  document.getElementById("messageBody").innerHTML = body;
  document.getElementById("icon").src = './media/'+image;
  document.getElementById("popup").style.display = "flex";
}

export function hidePrompt(gotIt) {

  if (gotIt && deleteID !== null && deleteID !== undefined) {
    removeItem(deleteID);
  }

  document.getElementById('cancelPrompt').style.display = "flex";
  document.getElementById("popup").style.display = "none";
}