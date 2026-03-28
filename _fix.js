const fs = require('fs');
let h = fs.readFileSync('C:/Users/35447/Downloads/Cloudy/index.html', 'utf8');

// Find and remove the duplicated/garbled status card section
// The problem is there's duplicated content between lines 2001-2035
// We need to find the correct wc-status-card and keep only that

// First, let's check how many wc-status-card divs exist
const matches = h.match(/id="wc-status-card"/g);
console.log('Found', matches ? matches.length : 0, 'wc-status-card elements');

// Remove the first broken occurrence (the one that's inside wc-view-chat-detail but malformed)
// Find the pattern that starts correctly
const brokenStart = 'id="wc-status-card-overlay" onclick="wcCloseStatusCard()" style="display:none;position:absolute;inset:0;z-index:200;background:rgba(0,0,0,0.18);"></div>\n                        <div  id="wc-status-card"';
const cleanStart = '<div id="wc-status-card-overlay" onclick="wcCloseStatusCard()" style="display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.18);"></div>\n                        <div id="wc-status-card" style="display:none;position:absolute;top:0;left:0;right:0;background:#fff;border-radius:0 0 20px 20px;padding:16px;max-height:70vh;overflow-y:auto;z-index:100;transform:translateY(-100%);transition:transform 0.35s ease;">\n                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">\n                                <div style="width:40px;"></div>\n                                <div style="font-size:15px;font-weight:600;">角色状态</div>\n                                <div onclick="wcCloseStatusCard()" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;">\n                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n                                </div>\n                            </div>\n                            <img id="wc-sc-avatar" src="" style="width:60px;height:60px;border-radius:50%;object-fit:cover;margin:0 auto 10px;display:block;">\n                            <div id="wc-sc-name" style="text-align:center;font-size:16px;font-weight:600;margin-bottom:4px;"></div>\n                            <div id="wc-sc-signature" style="text-align:center;font-size:12px;color:#8E8E93;margin-bottom:14px;"></div>\n                            <div id="wc-sc-rows" style="display:flex;flex-direction:column;gap:8px;"></div>\n                            <div onclick="wcToggleStatusHistory()" style="margin-top:12px;text-align:center;font-size:12px;color:#7B61FF;cursor:pointer;padding:6px;border-radius:10px;background:#F3F0FF;">📋 查看历史状态记录</div>\n                            <div id="wc-sc-history" style="display:none;margin-top:8px;max-height:320px;overflow-y:auto;"></div>\n                        </div>';

if (h.includes(brokenStart)) {
    // Add the history view before replacing
    const historyView = `\n<!-- 状态历史全屏页 -->\n<div id="wc-view-status-history" class="wc-page" style="display:none;position:fixed;inset:0;z-index:9500;background:#F2F2F7;flex-direction:column;">\n    <div style="display:flex;align-items:center;padding:12px 16px;background:#fff;box-shadow:0 1px 0 #E5E5EA;">\n        <div onclick="wcCloseStatusHistory()" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;">\n            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>\n        </div>\n        <div style="flex:1;text-align:center;font-size:17px;font-weight:600;">📋 状态历史</div>\n        <div style="width:40px;"></div>\n    </div>\n    <div id="wc-status-history-list" style="flex:1;overflow-y:auto;padding:12px;">\n    </div>\n</div>`;
    
    h = h.replace(brokenStart, cleanStart + historyView);
    fs.writeFileSync('C:/Users/35447/Downloads/Cloudy/index.html', h);
    console.log('Fixed!');
} else {
    console.log('Pattern not found, checking content...');
    console.log('First 500 chars around wc-status-card:');
    const idx = h.indexOf('wc-status-card');
    if (idx > 0) {
        console.log(h.substr(idx, 500));
    }
}
