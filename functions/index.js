const functions = require('firebase-functions');
const app = require('./server/build/bundle');
exports.app_ssr = functions.https.onRequest(app);