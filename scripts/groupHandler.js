

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

const isLoggedIn = (window.localStorage.getItem("QonnectUserLogIn") === "true"); // Change to false to simulate guest mode

let currentGroupId = null;
let isReplying = false;
let replyingTo = null;

const questionsData = Object.fromEntries(groups.map(branch => [branch.id, []]));

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
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, deleteField, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const container = document.getElementById("questionsContainer");
let oldHash = null;
let deleteID = null;

const hashValueWithHash = window.location.hash;
window.onhashchange = function() {
    // Code to execute when the URL hash changes
    const hash = window.location.hash.substring(1);
    if (oldHash !== null) {
      document.getElementById(oldHash).style.backgroundColor = '#fff';
    }
    document.getElementById(hash).style.backgroundColor = '#eee';
    oldHash = hash;
};

if (isLoggedIn) {
  document.getElementById('loginChat').style.display = 'none';
}

export async function getData(currentGroupId){

  setCurrentGroupId(currentGroupId);
    
    const timestamp = new Date().getTime() - 24 * 60 * 60 * 1000; // 24 hours ago

    const usersCollection = collection(db, currentGroupId);
    const q = query(usersCollection, where("time", ">=", timestamp), orderBy("time", "asc"));
    onSnapshot(q, (snapshot) => {
      setData([]);
      snapshot.forEach((doc) => {
        try{
          if (doc.data()) {
            updateList(doc.data());
            return;
          }
        }catch(err) {
        }
      });
    });

    updateList(null);
}

export function setData(data) {
  questionsData[getCurrentGroupId()] = data;
}

export function enterGroup(groupId) {

  container.innerHTML = '';
  document.getElementById("groupList").classList.add("hidden");
  document.getElementById("groupDetails").classList.remove("hidden");

  const group = groups.find(g => g.id === groupId);
  console.log(group);
  document.getElementById("groupTitle").innerText = group.name;
  document.getElementById("groupIntro").innerText = group.intro;

  document.getElementById("askSection").classList.toggle("hidden", !isLoggedIn);
  document.getElementById("questionInput").value = '';

  let email = window.localStorage.getItem('QonnectUser');

  const questions = getQuestionsData(groupId);
  console.log(questions);
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
      if (q !== null && q !== undefined) {
        const div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
          <p class="name"> <span style="color:orange;">•</span> ${q.name}</p>
          <div class="postContent">
            <div class="post" id="${q.id}">
              <p class="content">${(q.replyTo) ? `<a href="#${q.replyTo.id}">@${q.replyTo.name}</a>`: ``} ${q.text}</p>
              <div class="question-actions">
                ${isLoggedIn ? `
                  <button class="like" onclick="likeQuestion('${groupId}', ${index}, '${q.id}', this)"><i class="fas fa-heart ${q.likes.includes(window.localStorage.getItem("QonnectUser")) ? `liked` : ``}" id="like${q.id}"></i> <span id="likeSpan${q.id}">${q.likes.length ? q.likes.length : 0}</span></button>
                  <button class="like" onclick="replyToQuestion('${groupId}', ${index})"><i class="fas fa-reply"></i></button>
                  ${(q.email === email) ? `<button class="like" onclick="showPrompt('Are you sure?', 'Want to delete the text', 'trash.png', '${q.id}')"><i class="fas fa-trash-alt"></i></button>` : ``}      
                  <p class="like" style="font-size: 0.7rem; color: #aaa;">${formatTimeDifference(q.time)}</p>
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

export function updateList(newQuestion){
  cancelReply();
  // document.getElementById('replyHead').innerHTML = `What's on your mind`;
  if (newQuestion !== null && newQuestion !== undefined) {
    questionsData[getCurrentGroupId()].unshift(newQuestion);
  }
  enterGroup(getCurrentGroupId());
}

export async function removeItem(id) {
  const docRef = doc(db, getCurrentGroupId(), id);
  try {
    await deleteDoc(docRef).then(() => {
      if (questionsData[getCurrentGroupId()].length === 0) {
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
      } 
    });
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}

export function getCurrentGroupId(){
  return currentGroupId;
}

function setCurrentGroupId(groupId){
  currentGroupId = groupId;
}

export async function likeQuestion(groupId, index, id, btn) {

  document.getElementById(`like${id}`).classList.toggle('liked');

  if (document.getElementById(`like${id}`).classList.contains('liked')) {
    getQuestionsData(getCurrentGroupId())[index].likes.push(window.localStorage.getItem("QonnectUser"));
  }else{
    let filteredArray = getQuestionsData(getCurrentGroupId())[index].likes.filter(obj => obj !== window.localStorage.getItem("QonnectUser")); // Removes object with id 2
    getQuestionsData(getCurrentGroupId())[index].likes = filteredArray;
  }
  
  const docRef = doc(db, getCurrentGroupId(), id);
  await updateDoc(docRef, {
      likes: getQuestionsData(getCurrentGroupId())[index].likes,
  });

  //document.getElementById(`likeSpan${id}`).innerHTML = getQuestionsData(getCurrentGroupId())[index].likes;
  // btn.innerHTML = `<i class="fas fa-heart liked" id="like${id}"></i>  ${questionsData[groupId][index].likes}`;
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

export function showPrompt(message, body, image, id) {
  deleteID = id;
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
