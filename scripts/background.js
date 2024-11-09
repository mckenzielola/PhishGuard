//console.log('From Background Script :)')
//console.log(this)
let clickedUrl = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "requestConfirmation") {
    clickedUrl = request.url;
    //open popup
    chrome.action.openPopup();
  }

  if (request.action === "navigate") {

    // create new tab with clicked link 
    chrome.tabs.create({ url: clickedUrl });
    clickedUrl = ''; // Reset url
  }
});