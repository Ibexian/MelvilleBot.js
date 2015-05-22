var util = require('util');
var fs = require('fs');

var markov = require('markov');
var m = markov(2);

var s = fs.createReadStream(__dirname + '/test.txt');

m.seed(s, function () {
    var stdin = process.openStdin();
    console.log('> ');

    stdin.on('data', function (line) {
        var res = m.respond(line.toString()).join(' ');
        console.log(res);
        console.log('> ');
    });
});
