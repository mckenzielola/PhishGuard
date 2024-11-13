//example proxy server, please use read this with a grain of salt, didn't have time to properly dwell into it.
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/check-phishing', async (req, res) => {
  const { url } = req.body;
  const formData = new URLSearchParams();
  formData.append('url', url);
  formData.append('format', 'json');

  try {
    const response = await fetch('http://checkurl.phishtank.com/checkurl/', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error checking PhishTank URL');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
