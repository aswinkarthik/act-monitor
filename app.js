var express = require('express');
var app = express();
var morgan = require('morgan');


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})