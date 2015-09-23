'use strict';

var app = require('./index');

var server = app.listen(process.env.PORT || 3000, function () {
	var port = server.address().port;
	console.log('Listening on port %s', port);
});
