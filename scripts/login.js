
const firebaseConfig = {
	apiKey: "AIzaSyC2ZXOFbau1-_wqFAxJxanLTuAIiwbE8Yk",
	authDomain: "team-qonnect.firebaseapp.com",
	projectId: "team-qonnect",
	storageBucket: "team-qonnect.firebasestorage.app",
	messagingSenderId: "1081558162587",
	appId: "1:1081558162587:web:827837d1d3dbcdf1c8ba3e"
};


const groups = [
  { id: 'civil', name: 'CIVIL', intro: 'Department of Civil Engineering', code: '01' },
  { id: 'eee', name: 'EEE', intro: 'Department of Electrical & Electronics Engineering', code: '02' },
  { id: 'mech', name: 'MECH', intro: 'Department of Mechanical Engineering', code: '03' },
  { id: 'ece', name: 'ECE', intro: 'Department of Electronics and Communication Engineering', code: '04' },
  { id: 'cse', name: 'CSE', intro: 'Department of Computer Science Engineering', code: '05' },
  { id: 'cst', name: 'CST', intro: 'Department of Computer Science & Technology', code: '06' },
  { id: 'cit', name: 'CIT', intro: 'Department of Computer Science & Information Technology', code: '07' },
  { id: 'che', name: 'CHE', intro: 'Department of Chemical Engineering', code: '08' },
  { id: 'eie', name: 'EIE', intro: 'Department of Electronics & Instrumentation Engineering', code: '10' },
  { id: 'bio_m', name: 'BIO-MEDICAL', intro: 'Department of Bio-Medical Engineering', code: '11' },
  { id: 'inf', name: 'INF', intro: 'Department of Information Technology', code: '12' },
  { id: 'ec_control', name: 'ELECTRONICS & CONTROL', intro: 'Department of Electronics and Control Engineering', code: '13' },
  { id: 'ect', name: 'ECT', intro: 'Department of Electronics & Communication Technology', code: '14' },
  { id: 'css', name: 'CSS', intro: 'Department of Computer Science and Systems Engineering', code: '15' },
  { id: 'ecm', name: 'ECM', intro: 'Department of Electronics & Computer Engineering', code: '19' },
  { id: 'aero', name: 'AERONAUTICAL', intro: 'Department of Aeronautical Engineering', code: '21' },
  { id: 'instr_ctrl', name: 'INSTRUMENTATION & CONTROL', intro: 'Department of Instrumentation & Control Engineering', code: '22' },
  { id: 'biotech', name: 'BIO-TECHNOLOGY', intro: 'Department of Bio-Technology', code: '23' },
  { id: 'auto', name: 'AUTOMOBILE', intro: 'Department of Automobile Engineering', code: '24' },
  { id: 'mining', name: 'MINING', intro: 'Department of Mining Engineering', code: '26' },
  { id: 'pet', name: 'PETROLEUM', intro: 'Department of Petroleum Engineering / Technology', code: '27' },
  { id: 'petrochem', name: 'PETROCHEMICAL', intro: 'Department of Petrochemical Engineering', code: '28' },
  { id: 'aviation', name: 'AVIATION', intro: 'Department of Aviation Engineering', code: '29' },
  { id: 'amr', name: 'AIRCRAFT MAINTENANCE', intro: 'Department of Aircraft Maintenance Engineering', code: '30' },
  { id: 'met', name: 'METALLURGICAL', intro: 'Department of Metallurgical Engineering', code: '31' },
  { id: 'power', name: 'POWER', intro: 'Department of Power Engineering', code: '34' },
  { id: 'agri', name: 'AGRICULTURE', intro: 'Department of Agricultural Engineering', code: '35' },
  { id: 'textile', name: 'TEXTILE', intro: 'Department of Textile Engineering', code: '36' },
  { id: 'architecture', name: 'ARCHITECTURE', intro: 'Department of Architecture', code: '40' },
  { id: 'pharmacy', name: 'PHARMACY', intro: 'Department of Pharmacy', code: '00' },
  { id: 'cse_ai_ml', name: 'CSE-AI/ML', intro: 'Department of Computer Science Engineering With Specialization in Artificial Intelligence & Machine Learning', code: '42' },
  { id: 'cse_ai', name: 'CSE-AI', intro: 'Department of Computer Science Engineering With Specialization in Artificial Intelligence', code: '43' },
  { id: 'cse_ds', name: 'CSE-DS', intro: 'Department of Computer Science Engineering With Specialization in Data Science', code: '44' },
  { id: 'cse_aids', name: 'CSE-AI + DS', intro: 'Department of Computer Science Engineering With Specialization in Artificial Intelligence & Data Science', code: '45' },
  { id: 'cse_cs', name: 'CSE-CYBER', intro: 'Department of Computer Science Engineering With Specialization in Cyber Security', code: '46' },
  { id: 'cse_iot_cs', name: 'CSE-IOT + CS/BC', intro: 'Department of Computer Science Engineering With Internet of Things & Cybersecurity (including Blockchain)', code: '47' },
  { id: 'csb', name: 'CSB', intro: 'Department of Computer Science & Business Systems', code: '48' },
  { id: 'cse_iot', name: 'CSE-IOT', intro: 'Department of Computer Science Engineering With Specialization in Internet of Things', code: '49' },
  { id: 'ece_adv', name: 'ECE ADV', intro: 'Department of Electronics & Communication Engineering (Advanced Communication Technology)', code: '18' },
  { id: 'ece_ind', name: 'ECE IND', intro: 'Department of Electronics & Communication Engineering (Industry Integrated)', code: '20' },
  { id: 'food', name: 'FOOD', intro: 'Department of Food Engineering', code: '51' },
  { id: 'ece_iot', name: 'ECE-IOT', intro: 'Department of Electronics & Communication Engineering With Internet of Things specialization', code: '52' },
  { id: 'me_robotics', name: 'ME-ROBOTICS', intro: 'Department of Mechanical Engineering With Specialization in Robotics', code: '53' },
  { id: 'cs_aids_global', name: 'CSE-AIDS', intro: 'Department of Artificial Intelligence & Data Science (standalone branch)', code: '54' },
  { id: 'phe', name: 'PHARMACEUTICAL', intro: 'Department of Pharmaceutical Engineering', code: '55' },
  { id: 'aero_eng', name: 'AEROSPACE', intro: 'Department of Aerospace Engineering', code: '56' },
  { id: 'cs_bs2', name: 'CSE-BS (alt)', intro: 'Department of Computer Science & Business Systems', code: '57' },
  { id: 'cba', name: 'CBA', intro: 'Department of Computer Science & Big Data Analytics', code: '58' },
  { id: 'cs_cyber2', name: 'CS', intro: 'Department of Cyber Security', code: '59' },
  { id: 'iot', name: 'IOT', intro: 'Department of Internet of Things Engineering', code: '60' },
  { id: 'aim', name: 'AIM', intro: 'Department of Artificial Intelligence & Machine Learning (alternate code)', code: '61' },
  { id: 'cs_design', name: 'CSD', intro: 'Department of Computer Science & Design', code: '62' },
  { id: 'cse_reglang', name: 'CSE-RL', intro: 'Department of Computer Science Engineering (Regional Language)', code: '63' },
  { id: 'robotics', name: 'ROBOTICS', intro: 'Department of Robotics (standalone)', code: '64' },
  { id: 'cse_bs3', name: 'CSE-BS (variant)', intro: 'Department of Computer Science & Business Systems', code: '65' },
  { id: 'ece_vlsi', name: 'ECE-VLSI', intro: 'Department of Electronics & Communication Engineering (VLSI Design & Technology)', code: '66' },
  { id: 'cs_alt', name: 'CS (alt)', intro: 'Department of Computer Science', code: '68' }
];

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
	    showPopup();
		}).catch((error) => {
			const errorCode = error.code;
			const erroMessage = error.message;
		});
	});

}else {
	window.location.replace('index.html');
}

document.getElementById('check').addEventListener('click', ()=>checkBranch());

document.getElementById('cancel').addEventListener('click', ()=>closePopup());

function showPopup() {
	document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
	document.getElementById('popupOverlay').style.display = 'none';
}

function checkBranch() {
	const rollNumber = document.getElementById('rollInput').value.trim().toUpperCase();
	const match = rollNumber.match(/1A(\d{2})/);

	if (!match) {
	document.getElementById('result').innerHTML = 
		`❌ No branch found for code ${rollNumber}`;
	return;
	}

	const branchCode = match[1];
	const branch = groups.find(g => g.code === branchCode);

	if (branch) {
		window.localStorage.setItem("QonnectUserLogIn", "true");
		window.localStorage.setItem("QonnectUserRoll", rollNumber);
		window.localStorage.setItem("QonnectUser", auth.currentUser.email);
		window.localStorage.setItem("QonnectUserName", auth.currentUser.displayName);
		window.location.replace('index.html');
	} else {
	document.getElementById('result').innerHTML = 
		`❌ No branch found for code ${branchCode}`;
	}

	closePopup();
}