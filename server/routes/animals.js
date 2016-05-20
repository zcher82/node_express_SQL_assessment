var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';


router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done();
      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var animals = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals (animal, quantity) ' +
                  'VALUES ($1, $2)',
                  [animals.animal, animals.quantity],
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

module.exports = router;
