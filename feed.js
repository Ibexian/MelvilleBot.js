var FeedParser = require('feedparser'),
    request = require('request'),
    moby = require('./moby');

var req = request('http://www.reddit.com/r/javascript/top.xml'),
    feedparser = new FeedParser(),
    responses = [];

req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});
feedparser.on('readable', function() {
  var stream = this,
      meta = this.meta,
      item;

  while (item = stream.read()) {
    responses.push(item.title);
  }


});
//Once we've looked at all the recent titles pick a random one and tweetify it
feedparser.on('end', function(){
    var num = Math.floor(Math.random() * (responses.length));
    moby.tweetify(responses[num].toString());  
})


//ToDo Handle Failures in titles
//For both a feedparse error and for the tweetify returning undefined
