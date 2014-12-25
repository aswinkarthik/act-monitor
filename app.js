var express = require('express');
var app = express();
var morgan = require('morgan');
var actService = require('./service/ActService');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	usageData = 'None';
	actService.getUsage(function(param){
		usageData = param;
		res.render('pages/index',{
			data: {usage: usageData}
		});
	});
	
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server started at http://%s:%s', host, port)
});