'use strict';
// No analytics, cookies, referral storage or deferred linking.
const query = new URLSearchParams(window.location.search);
const title = query.get('title');
if (title) document.getElementById('article-title').textContent = title.slice(0, 1000);
const agent = navigator.userAgent;
const apple = /iPad|iPhone|iPod/.test(agent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const android = /Android/.test(agent);
// Verified Universal/App Links intercept this HTTPS URL before the page loads.
// A browser that reaches the fallback goes to the matching store; nothing is
// retained or replayed after installation.
if (apple || android) window.location.replace(document.getElementById(apple ? 'apple' : 'google').href);
