const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
require('firebase/firestore');
const express = require('express');
const fs = require('fs');
const app = express();
global.fetch = require('node-fetch');
const cc = require('cryptocompare');

const projectInfo = JSON.parse(fs.readFileSync(__dirname + '/../projectStuff.json'));

firebase.initializeApp({
    apiKey: projectInfo.apiKey,
    authDomain: projectInfo.authDomain,
    projectId: projectInfo.projectId
});

var db = firebase.firestore();

const coinInfoRef = db.collection('coinInfo');



function getLatestPrices(){

    coinInfoRef.doc('coins').get().then(doc => {

        if(!doc.exists){

            cc.coinList().then(list => {

                for(coin in list){
                    // coinInfoRef.doc('coins').set({
                    //     coin
                    // }).then(() => {
                    //     console.log(coin.name, " added!");
                    // }).catch(error => {
                    //     console.error("Error writing to database: ", error);
                    // });
                    console.log(coin);
                }

            });

        }

    });

}


let refresh = 30; // Seconds after each refresh to get the latest prices

setTimeout(() => {
    getLatestPrices();
}, refresh * 1000);

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const socket = require('socket.io');


app.get('/price', (request, response) => {

    response.render('price', {name: "John"});

    cc.coinList().then(list => {
        console.log(list);
    }).catch(console.error);

});


exports.app = functions.https.onRequest(app);
