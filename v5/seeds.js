var mongoose 	= require("mongoose");
var Campground	= require("./models/campground");
var Comment		= require("./models/comment");

var data = [
	{
		name: "Songshan", 
		image: "http://www.globalgeopark.org/Portals/1/Geopark%20Tourism/0229-tourism-Songshan-China-Mount%20in%20the%20cloud.jpg",
		description: "Songshan Geopark is located in DengFeng City, Henan Province and it covers an area of 464 Km2.From west to east, the Songshan Geopark stretch across the Ampere of slope mountain,Ma An mountain ,Five Fo mountain, Dan yang mountain,Shaoshi mountain,Taishi mountain and all the Five fingers ridge peaks. These hills rise straight up standing erect, capture a field vacating heaven, peaks rising one higher than another and grand and magnificent."	
	}, 

	{
		name: "Taishan",
		image: "http://www.strippedpixel.com/wp-content/uploads/2012/11/gate-to-heaven-tai-shan-china.jpg",
		description: "People were already flooding through the South Gate to Heaven and unloading from the cable cars as I made my way through the crowd to reach the steps. It was still a little before 11 am but I was quickly realising how lucky I was that the previous day’s rain had – as I now suspected was the case – put the tour groups off their trip. Unfortunately for them, however, every tour group in Tai’an had evidently had the same idea, and as I was preparing to head back down the Stairway to Heaven, it seemed like half of China was already gasping their exhausted way up to greet me."
	},

	{
		name: "Huangshan",
		image: "http://www.chinadiscovery.com/assets/images/huangshan/huangshan-600-7.jpg",
		description: "Huangshan, as one of China’s natural and cultural museums, well known for breathtaking natural scenery and Hui-style architecture, surely have something to satisfy every interest. The top things to do in Huangshan including top attractions & featured activities like the “the most beautiful mountain under heaven” - Yellow Mountain,  the UNESCO World Heritage Sites - Hongcun & Xidi Ancient Village, the Hui-style building of Tunxi Ancient Street with a history of 900 years etc. are the Must-Do."
	}
]

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("removed campgrounds");
		}
		// add a few campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground){
				if(err) {
					console.log(err);	
				} else {
					console.log("Add a new Campground");
					// create a comment
					Comment.create(
					{
						text: "This mountain is very beautiful.",
						author: "Homer"
					}, function(err, comment) {
						if(err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created a new comment.");
						}
					});
				}
			});
		});
	});

	
}

module.exports = seedDB;
