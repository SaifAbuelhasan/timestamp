// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  // console.log('test')
  res.json({greeting: 'hello API'});
});

// Respond with timestamp from date parameter
app.get("/api/:date", (req, res) => {
  // If the url has a unix date, the condition is met and the unix date is passed to the Date constructor
  const param = req.params.date;
  let date;
  if(Number(param)) {
    const unix = Number(param);
    date = new Date(unix);
  } else {
    date = new Date(param);
  }
  if(date == "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()})
  }
})

// Respond for current date
app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// process.env.PORT
