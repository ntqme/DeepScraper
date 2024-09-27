document.getElementById('collectData').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const reelQty = document.getElementById('reelQty').value;
  
    if (username && reelQty) {
      chrome.runtime.sendMessage({
        command: 'crawl-ig-page',
        data: {
          url: `https://www.instagram.com/${username}/reels/`,
          reel_qty: parseInt(reelQty, 10)
        }
      }, function (response) {
        if (response && response.data) {
          // Display collected data
          document.getElementById('output').innerHTML = `
            <h3>Collected Data:</h3>
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
          `;
        } else {
          document.getElementById('output').innerText = 'Failed to collect data.';
        }
      });
    } else {
      alert('Please fill out both fields.');
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('lastCompletion', function (result) {
      if (result.lastCompletion) {
        document.getElementById('output').innerHTML = `
          <h3>Last Collected Data:</h3>
          <pre>${JSON.stringify(result.lastCompletion, null, 2)}</pre>
        `;
      }
    });
  });  
