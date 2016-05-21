var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';
var randomNumber = require('./quantity.js'); //require randomNumber function from quantity module


router.post('/', function (req, res) {
  var animals = req.body; //var animals is equal to the body/info sent on the (req)uest to post

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
      console.log(animals);
    }
    client.query('INSERT INTO zoo_animals (animal, quantity) ' +   //insert data into zoo_animals table, columns animal & quantity
                  'VALUES ($1, $2)',
                  [animals.animal, randomNumber(1, 100)],  //animals is the object name given above with var animals. animal is referencing the name of the input field
      function (err, result) {
        done();

        if (err) {
          res.sendStatus(500);
          return;
        }
          res.send(true);
      });
  });
});



router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('SELECT * FROM zoo_animals', function (err, result) { //get data from zoo_animals table
      done();
      res.send(result.rows); //response is to send back the results of the rows from zoo_animals table. (will be sent back as an object
                              //object name of zoo_animals, properties = column names, and values = data)
    });
  });
});

module.exports = router;
