
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

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
let data = [];
let deleteID = '';
let option = 0;
let index = 0;
let container = document.getElementById("dataContainer");
const error = document.getElementById("error");

export async function getData(option){

	if (!isLoggedIn) {
		window.location.replace("login.html");
	}

	const user = window.localStorage.getItem("QonnectUser");

	if (checkValidUser(user) !== null) {

		if (option === 0) {
			/*setQuestionsData([{"id":"aIynFCTxzRztnViRT6jR","user":"stylishcharan2@gmail.com","tags":["a"],"name":"Charan Cherry","time":"1754315342868","description":"a\n          ","question":"a","votes":[]},{"user":"stylishcharan2@gmail.com","question":"sdfgsdfg","description":"sdfgsdfgsdf","id":"5LIeFFMPhgsShElWiBBK","name":"Charan Cherry","tags":["sdfg"],"time":"1754315331060","votes":[]},{"tags":["sdfgsdfg"],"votes":[],"question":"sfgsdf","name":"Charan Cherry","user":"stylishcharan2@gmail.com","id":"YrpOOa5lRibmCmPDrVx4","time":"1754276480084","description":"sdfgsdfg"},{"question":"qwerqwer","votes":[],"name":"Charan Cherry","id":"wPEqWSWN0soa320ypapN","user":"stylishcharan2@gmail.com","time":"1754276389104","tags":["qwerqwer"],"description":"qwerqwer"}]);
			enterGroup(getQuestionsData(), 0);*/
			const usersCollection = collection(db, "questions");
		    const q = query(usersCollection, where("user", "==", user), orderBy("time", "asc"));
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
		}else{
/*			const usersCollection = collection(db, "replies");
		    const q = query(usersCollection, where("user", "==", user), orderBy("time", "asc"));
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
		    enterGroup(getQuestionsData(), 1);*/
		    
		    setQuestionsData([]);
		    enterGroup(getQuestionsData(), 1);
		}

	}else{
		console.error("Invalid User");
	}	
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
            <div class="post" id="${q.id}">
					<p class="content-head" onclick="window.location.href='view.html?id=${q.id}'">${q.question}</p>
					<div class="content" onclick="window.location.href='view.html?id=${q.id}'">
					${(q.description.length > 200) ? `${(q.description).slice(0, 200)}...<br><a href="view.html?id=${q.id}">Read more</a>` : q.description}
					</div>
					<div class="question-actions">
					${isLoggedIn ? `
					  <button class="like"><i class="fas fa-arrow-up" id="like${q.id}"></i> <span id="likeSpan${q.id}"></span><i style="color:lightgray; font-style: normal;"">${((typeof(q.votes)==="object") ? q.votes.length : q.votes)} votes</i></button>
					  ${(q.user === email) ? `<button class="trash" onclick="showPrompt('Are you sure','Do you want to delete the post', 'trash.png', '${q.id}', ${index}, ${opt})"><i class="fas fa-trash-alt"></i><i >Delete</i></button>` : ``}      
					  <p class="like" style="font-size: 0.7rem; color: #aaa;">${formatTimeDifference(q.time)} ago</p>
					  `:
					  `<i>Login to like or reply</i>`
					}
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