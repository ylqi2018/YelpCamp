var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX -- Show all campgrounds
router.get("/", function(req, res){
	console.log(req.user);
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);		
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE -- Add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
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
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW -- Shows more info about one campgrounds
router.get("/:id", function(req, res) {
	//res.send("This will be the show page one day.");
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;

