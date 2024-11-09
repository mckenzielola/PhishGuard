//console.log(this)

//TODO... check if we need class names ID's
// Yes button, Class names in html not feteching data so keeping as class for now
document.getElementsByClassName("button button1")[0].addEventListener("click", function () {
    // send to background.js to handle moving to clicked site since we confirmed to move on
    chrome.runtime.sendMessage({ action: "navigate" });
    window.close(); // close so not in way anymore after advancing
  }); 
  
  
  // No button
  document.getElementsByClassName("button button2")[0].addEventListener("click", function () {
    window.close();
  });
  
  
  
  