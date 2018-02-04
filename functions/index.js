const functions = require('firebase-functions');

const express = require('express');
const app = express();
app.set('view engine', 'pug');

const socket = require('socket.io');


app.get('/price', (request, response) => {
    response.render('price', {name: "John"});
});


exports.app = functions.https.onRequest(app);
