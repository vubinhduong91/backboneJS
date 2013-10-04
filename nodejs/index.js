var ser = require('./server');
var rou = require('./routers');
var requestHandler = require('./requestHandler');


var handle = {};
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['upload'] = requestHandler.upload;

ser.start(rou.route, handle);
