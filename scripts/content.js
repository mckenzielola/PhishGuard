// // https://stackoverflow.com/questions/15661343/check-if-event-target-is-hyperlink
// // In  HTML <a> tag defines a hyperlink. It has the following syntax:
// // <a href="url">link text</a> so we can use this to find link's' in html

// // TLDR
// // <a ... <a> tags // hyperlinks in html 
// // href => url assignment in html
// // event.target.tagName.toLowerCase() === 'a' to check if <a> anchor tag is cliked

// function clickFunction(event) {
//     if (event.target.tagName.toLowerCase() === 'a') {
//       // stopping advance to hyperlink on click
//       event.preventDefault();
//       let url = event.target.href;
//       chrome.runtime.sendMessage({ action: "requestConfirmation", url: url });
//     }
//   }
  
//   document.addEventListener("click", clickFunction);

// content.js

//just some stuff I was messing around with
// Function to extract sender's email (you may need to replace the selector)
function extractSenderEmail() {
  const emailElement = document.querySelector('span.go'); // Update with correct selector for Gmail
  return emailElement ? emailElement.textContent.replace(/[<>]/g, '').trim() : '';
}

// Function to extract and check all links in the email
function extractAndCheckLinks() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const url = link.href;

    // Send the URL to the background script for phishing check
    chrome.runtime.sendMessage({ type: 'checkPhishing', url }, (response) => {
      if (response.is_phishing) {
        // If the URL is phishing, highlight the link and prevent it from being clicked
        link.style.color = 'red'; // Indicate phishing link
        link.addEventListener('click', (e) => {
          e.preventDefault();
          alert('Warning: This link is potentially malicious and has been flagged as a phishing site.');
        });
      }
    });
  });
}

// Run phishing checks when the content script loads
const senderEmail = extractSenderEmail();
if (isSuspiciousEmail(senderEmail)) {
  alert('Warning: The sender email address looks suspicious.');
}
extractAndCheckLinks();

// Helper function to check if an email address is suspicious
function isSuspiciousEmail(email) {
  const publicDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
  if (!email) return false;
  const emailDomain = email.split('@')[1];
  return publicDomains.includes(emailDomain) || hasSuspiciousPattern(email);
}

//just some random code that may or may not be used. Can leave alone
function hasSuspiciousPattern(email) {
  // Implement pattern checks (e.g., for common typos or phishing-like behavior)
  const phishingPatterns = [/example-pattern1/, /example-pattern2/]; // Add some suspicious pattern
  return phishingPatterns.some(pattern => pattern.test(email));
}
