var express 	= require("express");
var app 		= express();
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose");
var Campground	= require("./models/campground");
var seedDB 		= require("./seeds");
var Comment		= require("./models/comment");

var passport	= require("passport");
var LocalStrategy = require("passport-local");
var User		= require("./models/user");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v6", 
	{
		useMongoClient: true	
	}
);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
//console.log(__dirname);


// Passport Configuration
app.use(require("express-session")({
	secret: "Once again, I love you",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

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
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});

// ============================================================================
// Comments routes
// ============================================================================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	// loopup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
					res.redirect("/campgrounds");
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);				
				}
			});
		}
	});
	
	// create new comment
	// connect new comment to campground
	// redirect campground show page
});

// ============================================================================
// Auth Routes
// ============================================================================
// Show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");	
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});	// provided by password-local-mongoose
});

// Show login form
app.get("/login", function(req, res){
	res.render("login");
});

// Handling login logic
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), function(req, res){
	
});

// logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});


// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// ============================================================================
// Start listening
// ============================================================================
app.listen(3000, function(){
  console.log("YelpCamp Server has started");
});

