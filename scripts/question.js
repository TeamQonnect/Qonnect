let tagsCount = 0;

import { formatDoc, addLink } from '../scripts/questionHandler.js';

window.formatDoc = formatDoc;
window.addLink = addLink;

const tagInputContainer = document.getElementById('tag-input-container');
const aside = document.getElementById('asideMenu');
const searchBar = document.getElementById('searchBar');
const search2 = document.getElementById('search2');
const ask = document.getElementById('ask');

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
