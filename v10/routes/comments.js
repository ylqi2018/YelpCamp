var express = require("express");
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
	// find campground by id
console.log(req.params.id);
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Comment Create
router.post("/", isLoggedIn, function(req, res){
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
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//console.log("New comment's username will be " + req.user.username)
					// save comment
					comment.save();
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

router.get("/:comment_id/edit", checkCommentOwnerShip, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

// Comment update route
router.put("/:comment_id", checkCommentOwnerShip, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// comment destroy route
router.delete("/:comment_id", checkCommentOwnerShip, function(req, res){
	// findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnerShip(req, res, next){
	// Is user logged in?
	if(req.isAuthenticated()) {	
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err) {
				res.redirect("/campgrounds");
			} else {
				// Does user own the comment?
//				console.log("=====" + foundCampground.author.id);
//				console.log("-----" + req.user._id);
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}				
			}
		});
 	} else {
		res.redirect("back");
	}
		
		// otherwise, redirect
	// if not, redirect
}

module.exports = router;

