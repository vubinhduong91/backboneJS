var http = require('http');
var url = require('url');

function start(router,handle){
	function onRequest(request,respond){
		var pathname = url.parse(request.url).pathname; 
		respond.writeHead(200,{"Content-Type": "text/plain"});
		router(pathname,handle);
		respond.write("Hello world!");
		respond.end();
		console.log("pathname is" + pathname);

	}	

	http.createServer(onRequest).listen(8888);
}


exports.start = start;


