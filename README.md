# Extension Overview


PhishGuard is a Chrome extension that helps users to not get Phished :) . During research for this project we learned that almost 3.5 billion spam emails are sent daily  and google blocks about 100 million phishing emails daily (AAG IT Services) . This helped prompt the idea to create a tool that users can utilize to check if a link from their mailbox is safe or not. In doing so we opted to create a solution that not only provides prevention but also user awareness.

User in Gmail Mailbox clicks a link and the popup to the chrome extension appears with content from the sender of the received email. The extension shows the senders name, email, and the link that was clicked as shown below.


![alt text](https://media.discordapp.net/attachments/1157413914825457774/1315229227041427506/Screenshot_2024-12-07_at_21.24.22.png?ex=6756a62b&is=675554ab&hm=9d3d00e0be73100e76ec17330cf82cece086c8fe9a3650ec2e54e48b5a8d469c&=&format=webp&quality=lossless&width=924&height=890)



The extension fetches information from the following base snippet of html code.

```<span email="sofi.invest@investordelivery.com" name="SoFi Invest" data-hovercard-id="sofi.invest@investordelivery.com" class="gD" data-hovercard-owner-id="40"><span>SoFi Invest</span></span>```

We used the class (gD) to select attributes of email and name to send the popup of the chrome extension. 


We also ran into the issue where gmail wraps links in data-saferedirecturl as seen below. Even though we used href values in our code we still picked up the safe direct value. After a quick search our solution was to parse the ‘ q’ parameter from the link it self. This way when users saw the link it would not display with https://www.google.com/url?q=... 

```href="https://whop.com/hub/nickspicks/exp_wUjxykZLmV2trY/app/posts/post_1CHyYKPTYxapyxvLU1pSL5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://whop.com/hub/nickspicks/exp_wUjxykZLmV2trY/app/posts/post_1CHyYKPTYxapyxvLU1pSL5&amp;source=gmail&amp;ust=1733728510633000&amp;usg=AOvVaw1g_qm_RvB4Se6gOlWDOnqc">```

Next,  after our research it was obvious that not every database we saw would have every domain that was malicious. For example we  found that some malicious domains appeared in PhishTank and the Github repo we listed in the extension notes but not in the GoogleSafeBrowsing and vise versa. This is expected though since there are Billions of links being sent daily of potential phishing scams or attacks that it’s not possible to have the latest ones all in one area. 

Going back to user awareness and training we listed tips to help people using to stay ahead of attackers. Since the best way to prevent phishing is user awareness we felt embedding the content within the interface it self would force users to read it when unsure about a link. Lastly even though users can check the link using Google Safe Browsing, even though a link is not detected as malicious it is important to stay vigilant because again from (Sprinto) 1.2% of all emails sent are reported malicious as per phishing email statistics, which translates to 3.4 billion phishing emails daily. Every 1 in 4,200 emails sent is definitely a phishing scam email.

# Tips for users 

1. Check if the sender is using a public domain. 

2. Check the sender’s email address for any typos or misspellings. 

3. Check the Reply-To email address. 

4. Check the Return-Path email address. 

5. If a link in an email looks suspicious, copy the link and see if it appears in any online phishing databases 

6. Beware of emails that invoke a sense of urgency. 

7. Beware of emails that contain confidential data requests.



# Video Demo

https://github.com/user-attachments/assets/b0f23b0c-2702-46da-a5b8-8963b7a6d71e




# Resources used/mentioned

https://transparencyreport.google.com/safe-browsing/search?hl=en

https://phishtank.org/

https://github.com/mitchellkrogza/Phishing.Database?tab=readme-ov-file

https://developer.chrome.com/docs/extensions/reference/api/

https://developer.mozilla.org/en-US/docs/Web/API/URL/ 

https://www.javascripttutorial.net/javascript-dom/javascript-getattribute/

https://sprinto.com/blog/phishing-statistics/

https://aag-it.com/the-latest-phishing-statistics/


