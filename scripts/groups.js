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
const ask = document.getElementById('ask');

ask.addEventListener('click', ()=> {
  window.location.href = "question.html";
});

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


document.getElementById('submit').addEventListener('click', function(event) {
  postQuestion();
});

document.getElementById('cancelPrompt').addEventListener('click', function(event) {
  hidePrompt(false);
});

document.getElementById('goBack').addEventListener('click', function(event) {
  goBack();
});

function loadGroups(branches) {
  const list = document.getElementById("groupList");
  branches.forEach(group => {
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
      showPopup("Almost there", "Login to Post A Question", "cute.png");
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

function filterBranches() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  document.getElementById('groupList').innerHTML = '';
  loadGroups([]); // Clear previous results

  const filtered = groups.filter(g => 
    g.name.toLowerCase().includes(input) || g.intro.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    loadGroups([]);
    document.getElementById('groupList').innerHTML = '<li>No matches found</li>';
    return;
  }

  let branches = [];
  filtered.forEach(branch => {
    branches.push(branch);
  });

  console.log(branches);
  loadGroups(branches);
}


document.getElementById('search').addEventListener('click', ()=>{
  filterBranches();
});


document.getElementById('search2').addEventListener('click', ()=>{
  filterBranches();
});

loadGroups(groups);

const rollNumber = window.localStorage.getItem('QonnectUserRoll');
const match = rollNumber.match(/1A(\d{2})/);

if (match) {
  const branchCode = match[1];
  const branch = groups.find(g => g.code === branchCode);

  if (branch) {
    getData(`${branch.id}`);
  } else {
    console.log("Branch code not found in groups");
  }
} else {
  console.log("Pattern not found in roll number");
}

// getData('gate');
// enterGroup('gate');
