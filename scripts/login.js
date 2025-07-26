
const firebaseConfig = {
	apiKey: "AIzaSyC2ZXOFbau1-_wqFAxJxanLTuAIiwbE8Yk",
	authDomain: "team-qonnect.firebaseapp.com",
	projectId: "team-qonnect",
	storageBucket: "team-qonnect.firebasestorage.app",
	messagingSenderId: "1081558162587",
	appId: "1:1081558162587:web:827837d1d3dbcdf1c8ba3e"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, runTransaction, ref, child, get, set, update, remove, goOffline } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

var app = initializeApp(firebaseConfig);

if (window.localStorage.getItem("QonnectUserLogIn") === "false" || window.localStorage.getItem("QonnectUserLogIn") === null) {

	const provider = new GoogleAuthProvider();
	const auth = getAuth(app);
	const db = getDatabase(app);

	const googleLogin = document.getElementById('google-login');
	googleLogin.addEventListener('click', ()=>{
		signInWithPopup(auth, provider)
		.then((result) => {

			window.localStorage.setItem("QonnectUserLogIn", "true");
			window.localStorage.setItem("QonnectUser", auth.currentUser.email);
			window.location.replace('question.html');

		}).catch((error) => {
			const errorCode = error.code;
			const erroMessage = error.message;
		});
	});

}else {
	window.location.replace('question.html');
}