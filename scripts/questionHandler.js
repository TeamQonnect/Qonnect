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

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const rdb = getDatabase(app);
const db = getFirestore(app);

document.getElementById('cancelPrompt').style.display = "flex";

export function formatDoc(cmd, value=null) {
  if(value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

export function addLink() {
  const url = prompt('Insert url');
  formatDoc('createLink', url);
}

function review(text) {
	return true;
}

export function showPopup(message, body, image) {
	document.getElementById("message").innerHTML = message;
	document.getElementById("messageBody").innerHTML = body;
	document.getElementById("icon").src = './media/profiles/'+image;
	document.getElementById("popup").style.display = "flex";
}

export function hidePopup(gotIt) {

	if (gotIt) {
		if (document.getElementById('gotIt').innerHTML == "Got it") {
			window.location.replace("login.html");
		}else if (document.getElementById('gotIt').innerHTML == "Continue") {
			window.location.replace("profile.html");
		}else{
			document.getElementById("popup").style.display = "none";
		}
	}
	document.getElementById('cancelPrompt').style.display = "flex";
	document.getElementById("popup").style.display = "none";
}

export async function postQuestion(question, description, tags){
	if (window.localStorage.getItem("QonnectUserLogIn") === "false" || window.localStorage.getItem("QonnectUserLogIn") === null) {
	    showPopup("Almost there", "Login to Post A Question", "cute.png");
	}else {
		if (review(description) && window.localStorage.getItem("QonnectUser") !== "") {
			document.getElementById('gotIt').innerHTML = "Continue";
			document.getElementById('cancelPrompt').style.display = "none";
			document.getElementById('addToCartLoader').style.display = 'flex';
			document.getElementById('submit').style.display = 'none';

			const ques = {
				id: '',
				name: window.localStorage.getItem("QonnectUserName"),
				user: window.localStorage.getItem("QonnectUser"),
				question: question,
				description: description,
				tags: tags,
				time: String(new Date().getTime()),
				popularity: 0,
				votes: [],
				comments: []
			};

			if (ques) {

				const docRef = doc(collection(db, "questions"));

				let docID = docRef.id;

				ques['id'] = docID;

				await setDoc(docRef, ques)
				.then(()=>{
					showPopup("Hurray!!!", "Question posted. Visit <a href='profile.html'>Profile</a> to view your question", "party.png");
				})
				.catch((error)=>{
					console.log('Error'+error);
					document.getElementById('addToCartLoader').style.display = 'none';
					document.getElementById('submit').style.display = 'flex';
					document.getElementById('gotIt').innerHTML == "Okay";
					showPopup("Oops!! Something went wrong", "Question not posted. Try again later", "10.png");
				});
			}else{
				document.getElementById('gotIt').innerHTML == "Okay";
				document.getElementById('addToCartLoader').style.display = 'none';
				document.getElementById('submit').style.display = 'flex';
				showPopup("Oops!! Something went wrong", "Question not posted. Try again later", "10.png");
			}


		}
	}
}