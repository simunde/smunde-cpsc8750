// use the express library
const express = require('express');

//use cookie parser
const cookieParser = require('cookie-parser');

// create a new server application
const app = express();

app.use(cookieParser());

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;


let nextVisitorId = 1;
var currTime = new Date();
let visitormessage = ""
const {encode} = require('html-entities');
app.use(express.static('public'));

// ... snipped out code ...
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {


let lasttimevisit = req.cookies['visited'];

console.log(lasttimevisit);

  if (isNaN(lasttimevisit)) {
    visitormessage = "You have never visited before."
   }
  else{
    lasttimevisit = Math.floor((Date.now() - req.cookies['visited']) / 1000);
      visitormessage = `It has been ${lasttimevisit} seconds since your last visit`;
  }

  if(req.cookies['visitorId']){
  res.cookie('visitorId', nextVisitorId);}
  else{
  res.cookie('visitorId', nextVisitorId++);
}

  res.cookie('visited', Date.now().toString());
  
  res.render('welcome', {
    name: req.query.name || "World",
    date: new Date().toLocaleString(),
    nextVisitorId: req.cookies['nextVisitorId'] || nextVisitorId,
    visited: visitormessage,
  });

  currTime = new Date();

});
// Start listening for network connections
app.listen(port);


// Printout for readability
console.log("Server Started!");
