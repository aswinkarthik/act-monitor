var request = require('request');
var cheerio = require('cheerio');
var actAuthUrl = "http://portal.acttv.in/index.php/webpay";
var actUsageUrl = "http://portal.acttv.in/index.php/mypackage";

module.exports = {
	getUsage: function() {
		console.log("Authenticating user...");
		request.post(actAuthUrl, {
				form: {
					webuser: "username",
					pwd: "password"
				}
			} 
			,
			function(error, response, body){
				if(response.statusCode == 200) {
					console.log("Getting usage details...");
					request.get(actUsageUrl, function(error, response, body){
						$ = cheerio.load(body)		
						trItems = $('.moduletable table').find('tr');
						for(var i = 0; i < trItems.length - 3; i++ ) {
							trItems[i].children.forEach(function(tag){
								console.log(tag);
							});
						}

						

					});
				}	
		});
		return {
			usage: "0.0MB"
		};
	}
};