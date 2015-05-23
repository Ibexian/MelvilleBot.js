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
  // This is where the action is!
  var stream = this,
      meta = this.meta, // **NOTE** the "meta" is always available in the context of the feedparser instance
      item;
  while (item = stream.read()) {
    responses.push(item.title);
  }


});
feedparser.on('end', function(){
    var num = Math.floor(Math.random() * (responses.length));
    moby.tweetify(responses[num].toString());  
})
