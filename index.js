// index.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res ) =>{
  const str = req.params.date;

  //Setup
  const errorMsg = {error: "Invalid Date"};
  const wrapper = (date) => ({
    unix: Date.parse(date),
    utc: date.toUTCString(),
  })
  let date;

  if (str === undefined) {
    date = new Date(Date.now());
  } else if (str.match(/\d{13}/)) {
    date =  new Date(parseInt(str))
  } else {
    date = new Date(str)
  }

  if (date.toString() === "Invalid Date") {
    res.json(errorMsg);
  } else {
    res.json(wrapper(date))
  };

});



// listen for requests :)
var listener = app.listen((process.env.PORT || 3000), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
