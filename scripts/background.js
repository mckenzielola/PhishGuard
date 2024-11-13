//console.log('From Background Script :)')
//console.log(this)
let clickedUrl = '';
let emailData = []; 

  chrome.runtime.onInstalled.addListener(() => { 
    console.log('Extension installed');
  });
  
  function authenticate(callback) {
    const clientId = "828567801604-0m8vkl1cbfkejpdvobj09gctq8kkn7mf.apps.googleusercontent.com";
    const redirectUri = chrome.identity.getRedirectURL();
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.addons.current.message.action https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.addons.current.message.metadata https://www.googleapis.com/auth/gmail.addons.current.message.readonly https://www.googleapis.com/auth/gmail.metadata`;
  
    chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, function(redirectUri) {
      if (chrome.runtime.lastError || !redirectUri) {
        console.error(chrome.runtime.lastError);
        callback(null);
        return;
      }
      
      const accessTokenMatch = new URL(redirectUri).hash.match(/access_token=([^&]*)/);
      const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
      if (accessToken) {
        console.log('Access Token:', accessToken);
        callback(accessToken);
      } else {
        console.error('Failed to extract access token');
        callback(null);
      }
    });
  }
  
  function fetchEmailData(token, callback) {
    fetch('https://www.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.messages && data.messages.length > 0) {
          const messagePromises = data.messages.slice(0, 5).map(message =>  // Limit to first 5 for demo purposes
            fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
              headers: {
                'Authorization': 'Bearer ' + token,
              },
            })
              .then(res => res.json())
              .then(messageDetails => {
                if (messageDetails.payload && messageDetails.payload.headers) {
                  const senderHeader = messageDetails.payload.headers.find(header => header.name === 'From');
                  return senderHeader ? senderHeader.value : 'Unknown Sender';
                } else {
                  console.error('Missing payload or headers in message:', messageDetails);
                  return 'Unknown Sender';
                }
              })
          );
  
          Promise.all(messagePromises).then(senders => {
            console.log('Senders:', senders);
            callback(senders);
          });
        } else {
          console.warn('No messages found');
          callback([]);
        }
      })
      .catch(error => {
        console.error('Error fetching email data:', error);
        callback(null);
      });
  }
  
  
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

  if (request.action === "fetchEmailData") { 
    authenticate(token => fetchEmailData(token, sendResponse)); 
  }
  return true; 
});