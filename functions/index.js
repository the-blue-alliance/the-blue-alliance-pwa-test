const functions = require('firebase-functions');
const app = require('./crau-dist/server/bundle');
exports.app_ssr = functions.https.onRequest(app);