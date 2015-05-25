var Twit = require('twit');

var T = new Twit({

});


//ToDO Build twitter bot (@MelvilleBot)

module.exports = {
	twitterPost: function(text) {
		T.post('statuses/update', { status: text }, function(err, data, response) {
		  console.log("data", data);
		  console.log("text", text);
		})	
	}
}


