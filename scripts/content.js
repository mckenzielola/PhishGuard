// https://stackoverflow.com/questions/15661343/check-if-event-target-is-hyperlink
// In  HTML <a> tag defines a hyperlink. It has the following syntax:
// <a href="url">link text</a> so we can use this to find link's' in html

// TLDR
// <a ... <a> tags // hyperlinks in html 
// href => url assignment in html
// event.target.tagName.toLowerCase() === 'a' to check if <a> anchor tag is cliked

function clickFunction(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      // stopping advance to hyperlink on click
      event.preventDefault();
      let url = event.target.href;
      chrome.runtime.sendMessage({ action: "requestConfirmation", url: url });
    }
  }
  
  document.addEventListener("click", clickFunction);
  