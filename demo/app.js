var express = require("express");	// load express module and assign to variable express
var path = require("path");
var api = require("./routes/api");
var app = express();	// create express instance and assign to variable app


// set port
app.set("port", process.env.PORT || 3000);

// set views varialbe, that is the directory of views
app.set("views", path.join(__dirname, "views"));

// set view enjine,
app.set("view engine", "jade");

//app.use(express.favicon());
//app.use(express.logger("dev"));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

// set static file directory, such as local file
// dir: demo/public/images
// http://localhost:3000/images
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), function(req, res){
	console.log("Server started.");
});


// Routes
app.get("/", function(req, res){
	var body = "Hello world.";
	res.setHeader("Content-Type", "text/plain");
	res.setHeader("Content-Length", body.length);
	res.end(body);
});

app.get("/api", api.index);




