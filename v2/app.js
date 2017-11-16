var express 	= require("express");
var app 		= express();
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", 
	{
		useMongoClient: true	
	}
);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ============================================================================
// Schema Setup
// ============================================================================
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create(
//	{
//		name: "SongShan",
//		image: "http://www.globalgeopark.org/Portals/1/Geopark%20Tourism/0229-tourism-Songshan-China-Mount%20in%20the%20cloud.jpg",
//		description: "Songshan Geopark is located in DengFeng City, Henan Province and it covers an area of 464 Km2.From west to east, the Songshan Geopark stretch across the Ampere of slope mountain,Ma An mountain ,Five Fo mountain, Dan yang mountain,Shaoshi mountain,Taishi mountain and all the Five fingers ridge peaks. These hills rise straight up standing erect, capture a field vacating heaven, peaks rising one higher than another and grand and magnificent."
//	}, function(err, campground) {
//		if(err) {
//			console.log(err);
//		} else {
//			console.log("Newly Created Campground: ");
//			console.log(campground);
//		}
//	}
//);


// ============================================================================
// Routes
// ============================================================================

// Home page
app.get('/', function(req, res){ 
	//res.send("This will be the landing page.");
	res.render("landing");
});

// INDEX -- Show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);		
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE -- Add new campground to DB
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");	// redirect back to campgrounds page
		}

	});
});

// NEW -- Show form to create new campground
// This route will send the data to the post route
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// SHOW -- Shows more info about one campgrounds
app.get("/campgrounds/:id", function(req, res) {
	//res.send("This will be the show page one day.");
	// find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
	
});

// ============================================================================
// Start listening
// ============================================================================
app.listen(3000, function(){
  console.log("YelpCamp Server has started");
});

