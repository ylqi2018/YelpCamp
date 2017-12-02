var express = require("express");
var app = express();

//app.use(express.static(__dirname + "/public"));

var indexRoutes = require("./routes");

app.use("/", indexRoutes);

app.listen(8080, function(req, res) {
	console.log("The server start");
});
