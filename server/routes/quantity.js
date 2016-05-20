var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';


function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
      var quantity = randomNumber(1, 100);

      res.send(quantity);
      console.log(quantity);

  });
});


module.exports = router;
