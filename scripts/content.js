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

    // passing link to filter
    let url = filterGmailTracker(event.target.href);
    // grabbing info using class of html snippet were gD is were name email is located on gmail page
    let senderElement = document.querySelector('.gD');
    let senderName = senderElement.getAttribute('name');
    let senderEmail = senderElement.getAttribute('email');

    //console.log(senderEmail, senderName)
    
    chrome.runtime.sendMessage({ action: "requestConfirmation", url: url, senderName: senderName, senderEmail: senderEmail });
  }
}

// gmail wraps links in data-safedirectedurl so we need to retrieve original link 
// ex data-saferedirecturl="https://www.google.com/url?q=https://www.ebay.com/vod/FetchOrderDetails?itemId%3D282613478848%26transactionId%3D2631804855018%26mkevt%3D1%26mkpid%3D0%26emsid%3De11401.m144671.l152967%26mkcid%3D7%26ch%3Dosgood%26euid%3D297319d95e7e46bf8e90e169ca7d893b%26bu%3D44768839447%26exe%3D0%26ext%3D0%26osub%3D-1%257E1%26crd%3D20241119074003%26segname%3D11401&source=gmail&ust=1732140097550000&usg=AOvVaw3TQm_omOP7LkoBKgL95IDc"
    
function filterGmailTracker(link) {
  // getting decoded link
  return new URL(link).searchParams.get('q');
}


document.addEventListener("click", clickFunction); 

