const express = require('express')
const app = express()

/*
    For the purpose of making the testing easier, we've just put this
    in a seperate file.
*/
const myLib = require('./lib')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.PMA_HOST,
  user     : 'root',
  password : '1Berzerksoul',
  database : 'test_db'
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
    
  })
  connection.query('SELECT * FROM `POKEMON_TABLE` WHERE `pok_index` = 1', function (error, results, fields) {
    app.get('/', (req, res) => res.send(myLib.helloWorld() + results[0].pok_name))
});
app.get("/api/pokemon/status/:name", function(req, res, next){
    console.log(req.params.name);
    connection.query('SELECT * FROM `POKEMON_TABLE` WHERE `pok_name` = "'+ req.params.name +'"', function (error, results, fields) {
            res.send(results[0].pok_index)
    });
});
app.listen(80, () => console.log('Example app listening on port 80!'))