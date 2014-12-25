var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser');
var actService = require('./service/ActService');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));


app.set('view engine', 'ejs');

function processRequest(req,res) {
	actService.getUsage( req.body.webuser, req.body.pwd,
		function(param){
			matches = param.match(/[0-9]+\.[0-9]+/g);
			used = matches[0];
			total = matches[1];
			unused = (parseFloat(total) - parseFloat(used)).toFixed(2);
			res.render('pages/donut3d',{
				data: {used: used, unused: unused, total: total}
			});
		},
		function(param) {
			res.render('pages/login',{
				message: 'Username/Password does not match | You are not ac ACT Broadband user'
			});
		}
	);
}

app.get('/', function (req,res){
	processRequest(req,res);
});

app.post('/', function (req,res){
	processRequest(req,res);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server started at http://%s:%s', host, port)
});