var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var posts = [];
var objectIds = {
	post: 0
};

app.get("/blog/posts", function(request, response) {
	response.set("Content-type", "application/json");
	response.send(JSON.stringify(posts));
});

app.post("/blog/posts", function(request, response) {
	objectIds.post++;
	request.body.id = objectIds.post;
	request.body.dateAdded = Date.now();
	posts.push(request.body);

	response.send({ id: objectIds.post });
});

app.get("/blog/posts/:id", function(request, response) {
	var postId = request.params.id;

	var result = posts.filter(function(post) {
		return post.id == postId;
	});

	var foundPost = null;

	if(result.length > 0) {
		foundPost = result[0];
		response.set("Content-type", "application/json");
		response.send(JSON.stringify(foundPost));
	}
	else 
		response.sendStatus(404);
});

app.get("/*", function(req, res) {
	var filePath = req.originalUrl;
	var fileExtension = path.extname(filePath);

	if(fileExtension == "") {
		filePath = "./index.html";
	}
	else {
		filePath = "./" + filePath;
	}

	var indexOfQuerySymbol = filePath.indexOf("?");

	if(indexOfQuerySymbol > -1) {
		filePath = filePath.substring(0, indexOfQuerySymbol);
	}

	if(!fs.existsSync(filePath)) {
		res.sendStatus(404);

		return;
	}

	switch(path.extname(filePath)) {
		case ".html":
			res.set("Content-type", "text/html");
			break;

		case ".js":
			res.set("Content-type", "text/javascript");
			break;

		case ".css":
			res.set("Content-type", "text/css");
			break;

		case ".woff":
		case ".woff2":
		case ".ttf":
		case ".eot":
			res.set("Content-type", "application/font-woff");
			break;

	}

	res.send(fs.readFileSync(filePath, "utf8"));
});

server.listen(8889, function () {
    console.log("Node server running on http://localhost:8889");
});