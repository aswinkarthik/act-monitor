var request = require('request'),
	actAuthUrl = "http://portal.acttv.in/index.php/webpay",
	actUsageUrl = "http://portal.acttv.in/index.php/mypackage",
	$ = require('jquery'),
	cheerio = require('cheerio');

module.exports = {
	getUsage: function(username, password, success, failure) {
		var output = "";
		console.log("Authenticating user...");
		result = request.post(actAuthUrl, {
				form: {
					webuser: username,
					pwd: password
				}
			}, 
			function(error, response, body){

				if(response.statusCode == 200) {
					console.log("Getting usage details...");
					request.get(actUsageUrl, function(error, response, body){
						
						$ = cheerio.load(body, {
						    normalizeWhitespace: true,
						    xmlMode: false
						});
						
						var i = 0;
						var table = $("div.moduletable table tr");
						var selected = -1;

						if(table.length < 1) {
							console.log("Failed");
							failure();
						}
						
						for(i = 0; i < table.length; i++) {

							table[i].children.forEach(function(row){
								if( row['name'] !== undefined && row['name'] === 'th') {
									if(row['children'][0]['data'].indexOf("Usage") > -1) {
										selected = i;
									}
								}
								if( row['name'] !== undefined && row['name'] === 'td' && selected == i) {
									output += row['children'][0]['children'][0]['data'];
									console.log("Request ended");
									success(output);
								}									
							});
						}
			        });
				}	
			}
		);
	}
};