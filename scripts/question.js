let tagsCount = 0;

import { formatDoc, addLink, postQuestion, showPopup, hidePopup } from '../scripts/questionHandler.js';

window.formatDoc = formatDoc;
window.addLink = addLink;
window.postQuestion = postQuestion;
window.showPopup = showPopup;
window.hidePopup = hidePopup;

const tagInputContainer = document.getElementById('tag-input-container');
const aside = document.getElementById('asideMenu');
const searchBar = document.getElementById('searchBar');
const search2 = document.getElementById('search2');
const ask = document.getElementById('ask');

if (window.localStorage.getItem("QonnectUserLogIn") === "false" || window.localStorage.getItem("QonnectUserLogIn") === null) {
    showPopup("Almost there", "Login to Post A Question", "cute.png");
}

if (window.localStorage.getItem("QonnectUser") === "" || window.localStorage.getItem("QonnectUser") === null) {
    showPopup("Almost there", "Login to Post A Question", "wink.png");
}

document.getElementById('tagsInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const value = tagsInput.value.trim();
    if (value && tagsCount < 5) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = value.toLowerCase().replaceAll(" ", "-");
      tagInputContainer.append(tag);
      tagsInput.value = '';
      tag.onclick = function () {
        tagsCount--;
        tag.remove();
        checkTagsInput(tagsInput);
      }
      tagsCount++;
      checkTagsInput(tagsInput);
    }
  }
});

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

document.getElementById('submit').addEventListener('click', function () {
  let question = document.getElementById('question').value
  let description = String(document.getElementById('content').innerHTML);
  let tags = Array.from(tagInputContainer.querySelectorAll('.tag')).map(t => t.textContent);
  let prompter = document.getElementById('postPrompt');

  if (question.trim() !== "" && description.trim() !== "" && tags.length > 0 && tags.length <= 5) {
    postQuestion(question, description, tags);
  }else{
    if (question.trim() === "") {
      prompter.innerHTML = "Question cannot be empty";
    }else if (description.trim() === "") {
      prompter.innerHTML = "Description cannot be empty";
    }else if (tags.length == 0 || tags.length > 5) {
      prompter.innerHTML = "Minimum 1 tag and Maximum 5 tags are required";
    }else {
      prompter.innerHTML = "Something went wrong, Try Again";
    }
  }
});


function checkTagsInput(tagsInput){
  if (tagsCount < 5) {
    tagsInput.disabled=false;
    document.getElementById('tagsPrompt').innerHTML = "Specify maximum 5 tags describing your question ("+tagsCount+"/5)";
    document.getElementById('tagsPrompt').style.color = "gray";
  }else{
    tagsInput.disabled=true;
    document.getElementById('tagsPrompt').innerHTML = "Maximum tags reached";
    document.getElementById('tagsPrompt').style.color = "red";
  }
}


