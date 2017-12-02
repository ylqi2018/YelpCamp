var express = require("express");

var router = express();

// Routes
router.get("/", function(req, res){
	res.send("Hello World!");
});

router.get("/customer", function(req, res){
	res.send("Customer Page");
});

router.get("/admin", function(req, res){
	res.send("Admin Page");
});


module.exports = router;
