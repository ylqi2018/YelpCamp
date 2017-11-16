var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Huangshan", image: "http://www.chinaculturetour.com/images/tours/huangshan/travel-seasons.jpg"},
	{name: "Huashan", image: "https://photos.adventureinyou.com/wp-content/uploads/2016/09/22032514/mount-huashan-deadliest-climb_6-960x640.jpg"},
	{name: "Taishan", image: "http://whc.unesco.org/uploads/thumbs/site_0437_0001-750-0-20080618083936.jpg"},
	{name: "Huangshan", image: "http://www.chinaculturetour.com/images/tours/huangshan/travel-seasons.jpg"},
	{name: "Huashan", image: "https://photos.adventureinyou.com/wp-content/uploads/2016/09/22032514/mount-huashan-deadliest-climb_6-960x640.jpg"},
	{name: "Taishan", image: "http://whc.unesco.org/uploads/thumbs/site_0437_0001-750-0-20080618083936.jpg"},
	{name: "Huangshan", image: "http://www.chinaculturetour.com/images/tours/huangshan/travel-seasons.jpg"},
	{name: "Huashan", image: "https://photos.adventureinyou.com/wp-content/uploads/2016/09/22032514/mount-huashan-deadliest-climb_6-960x640.jpg"},
	{name: "Taishan", image: "http://whc.unesco.org/uploads/thumbs/site_0437_0001-750-0-20080618083936.jpg"}
]

// ============================================================================
// Routes
// ============================================================================



// Home page
app.get('/', function(req, res){ 
	//res.send("This will be the landing page.");
	res.render("landing");
});

// View all campgrounds
app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds1: campgrounds});
});

// post routes
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	// res.send("You hit the POST ROUTE");
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

// This route will send the data to the post route
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});


app.listen(3000, function(){
  console.log("YelpCamp Server has started");
});

