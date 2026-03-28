const fs = require('fs');
const h = fs.readFileSync('C:/Users/35447/Downloads/Cloudy/index.html', 'utf8');
const idx = h.indexOf('wc-chat-background-layer');
if (idx > 0) {
    console.log('wc-chat-background-layer at line:', h.substring(0, idx).split('\n').length);
}
