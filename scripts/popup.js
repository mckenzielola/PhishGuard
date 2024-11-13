//console.log(this)

//TODO... check if we need class names ID's
// Yes button, Class names in html not feteching data so keeping as class for now
document.addEventListener('DOMContentLoaded', () => { 
  // Request email data from background script 
  chrome.runtime.sendMessage({ action: 'fetchEmailData' }, (response) => { 
    if (response && response.length > 0) { 
      const emailList = document.getElementById('emailList'); 
      response.forEach(sender => { 
        const listItem = document.createElement('li'); 
        listItem.textContent = `Sender: ${sender}`; 
        emailList.appendChild(listItem); 
      }); 
    } else {
      const listItem = document.createElement('li'); 
      listItem.textContent = 'No emails found.'; 
      emailList.appendChild(listItem);
    } 
  });


document.getElementsByClassName("button button1")[0].addEventListener("click", function () {
    // send to background.js to handle moving to clicked site since we confirmed to move on
    chrome.runtime.sendMessage({ action: "navigate" });
    window.close(); // close so not in way anymore after advancing
  }); 
  
  
  // No button
  document.getElementsByClassName("button button2")[0].addEventListener("click", function () {
    window.close();
  });
  
});
  
  
  