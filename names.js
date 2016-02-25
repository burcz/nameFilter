var express = require('express');
var app = express();

app.use("/functions", express.static(__dirname + '/functions'));

app.get('/test.htm', function (req, res) {
	var options = {
		root: __dirname
	};
	res.sendFile("test.htm", options, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
	});
});

var server = app.listen(8081, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);

});