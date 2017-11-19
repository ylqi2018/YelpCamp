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

// require routes
var campgroundsRoutes 	= require("./routes/campgrounds");
var commentsRoutes 		= require("./routes/comments");
var indexRoutes 		= require("./routes/index");

var methodOverride = require("method-override");

//seedDB();//Seed the database

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

app.use(methodOverride("_method"));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// ============================================================================
// Routes
// ============================================================================

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundsRoutes);

// ============================================================================
// Start listening
// ============================================================================
app.listen(3000, function(){
  console.log("YelpCamp Server has started");
});

