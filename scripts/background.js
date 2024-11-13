// //console.log('From Background Script :)')
// //console.log(this)
// let clickedUrl = '';

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "requestConfirmation") {
//     clickedUrl = request.url;
//     //open popup
//     chrome.action.openPopup();
//   }

//   if (request.action === "navigate") {

//     // create new tab with clicked link 
//     chrome.tabs.create({ url: clickedUrl });
//     clickedUrl = ''; // Reset url
//   }
// });

//note, found a copy of the csv dataset from this public github repo: https://github.com/gangeshbaskerr/Phishing-Website-Detection/tree/main
//It seems like phishtank have locked their datasets behind a token system and they aren't allowing people to register at the moment.
//I did manage to take the xml copy though (updated as of 11/12/2024 1:30 a.m PST)
//In either case I've setup the parser to parse csv files but realistically speaking I don't know if it matters all that much.

//This is just a quick implementation that grabs urls from the local file, didn't have time to check for proper correctness and it's a little difficult due to my lack of JS knowledge, hopefully someone can take a look at this 
//if not, I'll get to it asap
// let phishingUrls = [];

// // Load the PhishTank data from a local CSV file when the extension is installed
// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Phishing Life Saver extension installed!");
//   loadLocalPhishTankData();
// });

// // Function to load and parse the local PhishTank CSV data
// function loadLocalPhishTankData() {
//   fetch(chrome.runtime.getURL('data/online-valid.csv'))
//     .then(response => response.text())
//     .then(csvData => {
//       // Parse the CSV data
//       phishingUrls = parseCSV(csvData);
//       console.log("Local PhishTank data loaded successfully!");
//     })
//     .catch(error => {
//       console.error("Error loading local PhishTank data:", error);
//     });
// }

// // Function to parse CSV data and extract URLs
// function parseCSV(csvData) {
//   const lines = csvData.split('\n');
//   const urls = [];

//   for (let i = 1; i < lines.length; i++) { // Start from 1 to skip the header
//     const line = lines[i].trim();
//     if (line) {
//       const columns = line.split(',');
//       urls.push(columns[1].replace(/"/g, '')); // Adjust the index based on the CSV structure
//     }
//   }

//   return urls;
// }

// // Listen for messages from content scripts
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'checkPhishing') {
//     const url = request.url;
//     const isPhishing = phishingUrls.includes(url);
//     sendResponse({ is_phishing: isPhishing });
//   }
//   return true; // Keeps the messaging channel open for async response
// });

//Implementation 2: This uses the Phishtank API, again, didn't have time for proper testing so please use this as reference only
//NOTE: THIS IMPLEMENTATION REQUIRES THE USE OF A PROXY SERVER, THE PHISHTANK API DOESN'T HAVE THE REQUIRED CORS HEADERS FOR USE IN A GOOGLE EXTENSION.
// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'checkPhishing') {
    const url = request.url;
    checkPhishTankViaProxy(url, sendResponse);
    return true; // Keeps the messaging channel open for async response
  }
});

// Function to check URL using your server-side proxy
function checkPhishTankViaProxy(url, sendResponse) {
  fetch('http://localhost:3000/check-phishing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  })
    .then(response => response.json())
    .then(data => {
      // Check if the URL is flagged as phishing
      const isPhishing = data.results.in_database && data.results.verified && data.results.valid;
      sendResponse({ is_phishing: isPhishing });
    })
    .catch(error => {
      console.error("Error checking PhishTank URL via proxy:", error);
      sendResponse({ is_phishing: false }); // Default to false on error
    });
}


