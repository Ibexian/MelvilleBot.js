var FeedParser = require('feedparser'),
    request = require('request'),
    schedule = require('node-schedule'),
    moby = require('./moby');

var req = request('http://www.reddit.com/r/javascript/top.xml'),
    feedparser = new FeedParser(),
    responses = [];

var scrape = function() {
  req.on('error', function (error) {
    fs.appendFile('log.txt', "Request Error " + error + " " + new Date(), function (err) {});
  });
  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });


  feedparser.on('error', function(error) {
    fs.appendFile('log.txt', "FeedParser Error " + error + " "+ new Date(), function (err) {});
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
      moby.tweetify(responses[num].toString())
  })
}

//Set up the cron to repeat this daily
schedule.scheduleJob('0 3,15 * * *', scrape());
