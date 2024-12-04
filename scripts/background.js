//console.log('From Background Script :)')
//console.log(this)
let clickedUrl = '';
let senderInfo = { name: '', email: '' };

// wait for other part of chrome extension to do something, mainly click
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.action === "requestConfirmation") {
    clickedUrl = request.url;
    senderInfo.name = request.senderName;
    senderInfo.email = request.senderEmail;
    
    //open popup to user
    chrome.action.openPopup();
  }
  
  if (request.action === "navigate") {
    // create new tab with clicked link 
    chrome.tabs.create({ url: clickedUrl });

    clickedUrl = ''; // Reset url
    senderInfo = { name: '', email: '' }; // Reset sender info also
  }

// CHECK... protocol + hostname
  if (request.action === "googleSafeBrowser") {
    // same as navigate but clicked domain and concatenated with gmail safe broswer url 
    let url = new URL(clickedUrl);
    let domainURL = url.protocol + "//" + url.hostname;

    chrome.tabs.create({ url: "https://transparencyreport.google.com/safe-browsing/search?url=" + domainURL });
    
    clickedUrl = ''; // Reset url
    senderInfo = { name: '', email: '' }; // Reset sender info also
  }

   if (request.action === "getPopupData") {
    // sending to the popup
    sendResponse({url: clickedUrl, senderName: senderInfo.name, senderEmail: senderInfo.email});
  } 

});



































