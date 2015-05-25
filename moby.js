var util = require('util');
var fs = require('fs');
var twitter = require('./twitterBot');

var markov = require('markov');
var m = markov(2);
//ToDo - Get a larger sample - or convert to static table
var s = fs.createReadStream(__dirname + '/test.txt');


module.exports = {
	tweetify: function(line) {
		function stringPretty(string) {
			var reg = new RegExp(/[,.?!\s]+/);
			var endNum =  reg.test(string.charAt(string.length-1));
			//Start with a capital, remove the final space, and add punctuation if there is none
		    return string.charAt(0).toUpperCase() + string.slice(1, string.length) + (endNum ? "" : ".");
		}
		m.seed(s, function () {
		    	var items = line.toString().split(' ');
		    	var results = [];

		    	for(i=0; i<items.length; i++){
			    	var search = m.search(items[i]);

			    	if (search) {
			    		//move backward from each word in the title predicting the word before it
				        var back = m.backward(search).join(' ');
				        if (back.length !== 0 ) {
				        	var tempItem = items[i];
				        	for (j=i + 1; j<items.length; j++){
				        		tempItem = tempItem + " " + items[j];
				        	}
				        	//Add the result and the remainder of the title to the result array
				        	results.push(stringPretty((back + " " + tempItem).split(/\r?\n|\r/).join(' ')));
				    	}
				    }
				    if(i === items.length -1) {
				    	//return random result from array
				    	var num = Math.floor(Math.random() * (results.length));
				    	console.log(results[num]);
				    	twitter.twitterPost(results[num]);
				    }
		    	};

		});
	}
}
