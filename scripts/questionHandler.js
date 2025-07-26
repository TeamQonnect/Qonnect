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

export function review(text) {
	
}