var express 	= require("express");
var app 		= express();
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose");
var Campground	= require("./models/campground");
var seedDB 		= require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", 
	{
		useMongoClient: true	
	}
);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
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

