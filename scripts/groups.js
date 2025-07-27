const isLoggedIn = true; // Change to false to simulate guest mode
let currentGroupId = null;

const groups = [
  { id: 'gate', name: 'GATE ', intro: 'This group is for all students preparing for GATE . Share strategies, resources, and doubts related to the exam.' },
  { id: 'upsc', name: 'UPSC ', intro: 'Welcome to the UPSC group! Discuss NCERTs, current affairs, optional subjects, and interview prep.' },
  { id: 'neet', name: 'NEET ', intro: 'Preparing for NEET? Ask doubts, share tricks, or suggest best books and mock tests.' },
  { id: 'cat', name: 'CAT ', intro: 'For all MBA dreamers. Talk about VARC, DILR, Quant, mocks, and college cutoffs.' },
  { id: 'ssc', name: 'SSC CGL', intro: 'This is your space for SSC CGL preparation — Quant tricks, English, reasoning and more.' }
];

const questionsData = {
  gate: [{"email":"stylishcharan2@gmail.com", "name":"Charan Cherry", "text":"dfghdh","likes":0,"replies":[]},{"email":"stylishcharan2@gmail.com", "name":"Charan Cherry", "text":"dfhgdfghdfgh","likes":0,"replies":[]},{"email":"stylishcharan2@gmail.com", "name":"Charan Cherry", "text":"dfhdfghdfgh","likes":0,"replies":[]}],
  upsc: [],
  neet: [],
  cat: [],
  ssc: []
};

function loadGroups() {
  const list = document.getElementById("groupList");
  groups.forEach(group => {
    const div = document.createElement("div");
    div.className = "group-card";
    div.innerHTML = `
      <h4>${group.name}</h4>
      <button onclick="enterGroup('${group.id}')">Explore <i class="fas fa-play"></i></button>
    `;
    list.appendChild(div);
  });
}

function enterGroup(groupId) {
  document.getElementById("groupList").classList.add("hidden");
  document.getElementById("groupDetails").classList.remove("hidden");

  const group = groups.find(g => g.id === groupId);
  document.getElementById("groupTitle").innerText = group.name;
  document.getElementById("groupIntro").innerText = group.intro;

  currentGroupId = groupId;
  const container = document.getElementById("questionsContainer");
  container.innerHTML = '';
  document.getElementById("askSection").classList.toggle("hidden", !isLoggedIn);
  document.getElementById("questionInput").value = '';

  const questions = questionsData[groupId];
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
          <div class="post">
            <p class="content">${q.text}</p>
            <div class="question-actions">
              ${isLoggedIn ? `
                <button class="like" onclick="likeQuestion('${groupId}', ${index}, this)"><i class="fas fa-thumbs-up"></i> ${q.likes}</button>
                ` :
                `<i>Login to like or reply</i>`
              }
            </div>
          </div>
        </div>
      `;
// <button onclick="replyToQuestion('${groupId}', ${index})">💬 Reply</button>

      container.appendChild(div);
    });
  }
}

function likeQuestion(groupId, index, btn) {
  questionsData[groupId][index].likes += 1;
  btn.innerHTML = `<i class="fas fa-thumbs-up"></i>  ${questionsData[groupId][index].likes}`;
}

function replyToQuestion(groupId, index) {
  const reply = prompt("Enter your reply:");
  if (reply) alert("Reply saved (feature under development)");
}

function postQuestion() {
  const input = document.getElementById("questionInput");
  let text = input.value.trim();

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

  const newQuestion = { email, name, text, likes: 0, replies: [] };
  questionsData[currentGroupId].unshift(newQuestion);
  input.value = '';
  enterGroup(currentGroupId); // Re-render
}

function goBack() {
  document.getElementById("groupDetails").classList.add("hidden");
  document.getElementById("groupList").classList.remove("hidden");
}

loadGroups();
enterGroup('gate');