# YelpCamp
* Add Landing Page
    The render page, landing.ejs, must be in the views directory.
* Add Campgrounds Page that list all campgrounds
  Each Campground has:
  * name
  * image[
        {
            name: String,
            image: String of url	
        }
    ]

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating new Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a new navbar to all templates
* Style the new campground form

## This is the begining of v2 ##
#Add Mongoose
* Install and configure mongoose
	* install mongoose
	* create connection
	* make schema
* Use campground model inside of our routes

#Show page
* Review the restful routes
* Add description to campground model
* Show db.collection.drop()
* Add a show route/templates

restful routes
name	url			verb	description
==================================================================================
INDEX	/dogs		GET		Display a list of all dogs
NEW		/dogs/new	GET		Displays a new form to make a new dog
CREATE	/dogs		POST	Add new dog to DB
SHOW	/dogs/:id	GET		Shows info of one dog
