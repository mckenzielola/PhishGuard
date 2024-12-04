//console.log(this)

// Yes button
document.getElementsByClassName("button button1")[0].addEventListener("click", function () {
  // send to background.js to handle moving to clicked site since we confirmed to move on
  chrome.runtime.sendMessage({ action: "navigate" });
  window.close(); // close so not in way anymore after advancing
}); 

// No button
document.getElementsByClassName("button button2")[0].addEventListener("click", function () {
  window.close();
});

// Google Safe Browser Advance Button
document.getElementsByClassName("button button3")[0].addEventListener("click", function () {
  // send to background.js to handle moving to clicked site to check on google safe browser
  chrome.runtime.sendMessage({ action: "googleSafeBrowser" });
  window.close(); // close so not in way anymore after advancing
});

chrome.runtime.sendMessage({ action: "getPopupData" }, (response) => {
  // updating popup with new linked clicked info
  document.getElementById("link").textContent = response.url;
  document.getElementById("name").textContent = response.senderName;
  document.getElementById("email").textContent = response.senderEmail;
});





