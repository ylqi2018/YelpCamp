var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Home page
app.get('/', function(req, res){ 
	//res.send("This will be the landing page.");
	res.render("landing");
});

// View all campgrounds
app.get("/campgrounds", function(req, res){
	var campgrounds = [
	{name: "Huangshan", image: "http://www.chinaculturetour.com/images/tours/huangshan/travel-seasons.jpg"},
	{name: "Huashan", image: "https://photos.adventureinyou.com/wp-content/uploads/2016/09/22032514/mount-huashan-deadliest-climb_6-960x640.jpg"},
	{name: "Taishan", image: "http://whc.unesco.org/uploads/thumbs/site_0437_0001-750-0-20080618083936.jpg"}
]
	res.render("campgrounds", {campgrounds1: campgrounds});
});


app.listen(3000, function(){
  console.log("YelpCamp Server has started");
});

