

function route(pathname,handle){
	console.log("i route it! :" + pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname]();
	}
	else{
		console.log("no request handler found for"+ pathname);
	}
}

exports.route = route;