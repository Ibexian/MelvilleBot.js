var Twit = require('twit');

var T = new Twit({
	consumer_key: '-------------'
	, consumer_secret: '-------------'
	, access_token: '---------------------------'
	, access_token_secret: '-------------'
});

module.exports = {
	twitterPost: function(text) {
		T.post('statuses/update', { status: text }, function(err, data, response) {
		  console.log("data", data);
		  console.log("text", text);
		})	
	}
}


