let index=0;

export function showPrompt(message, body, image, id, idx, opt) {
  index = idx;
  // option = opt;
  document.getElementById("message").innerHTML = message;
  document.getElementById("messageBody").innerHTML = body;
  document.getElementById("icon").src = './media/'+image;
  document.getElementById("popup").style.display = "flex";
}

export function hidePrompt(gotIt, done) {

  if (gotIt && index !== null && index !== undefined && done) {
    removeItem(index, done);
  }

  document.getElementById('cancelPrompt').style.display = "flex";
  document.getElementById("popup").style.display = "none";
}

export async function removeItem(id, done) {

  done(id, true);
  
}