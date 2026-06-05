const https = require('https');
const http = require('http');

http.get('http://localhost:5000/api/menu/items', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const items = JSON.parse(data).data;
    items.forEach(item => {
      if (item.primary_image) {
        https.get(item.primary_image, (imgRes) => {
          if (imgRes.statusCode !== 200) {
            console.log(`BROKEN [${imgRes.statusCode}]: ${item.name} - ${item.primary_image}`);
          }
        }).on('error', (e) => {
          console.log(`ERROR: ${item.name} - ${e.message}`);
        });
      } else {
        console.log(`MISSING: ${item.name}`);
      }
    });
  });
});
