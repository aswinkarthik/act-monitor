var express = require('express');
var app = express();
var morgan = require('morgan');
var actService = require('./service/ActService');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	data = actService.getUsage()
	res.render('pages/index',{
		data: data
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server started at http://%s:%s', host, port)
});