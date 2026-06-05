const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1611162618479-ee3d24aaef8b?w=1000&q=80',
  'https://images.unsplash.com/photo-1502462041640-b3d17d023f1e?w=1000&q=80',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1000&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode}: ${url}`);
  }).on('error', e => console.error(e));
});
