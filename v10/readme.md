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

##This is the beginning of v3 ##
#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

#Add Seeds file
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Make errors go away
* Display comments on campground show page

##This is the beginning of v4 ##
#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comment nicely

##This is the beginning of v6 ##
#Finish Styling Show Page
* Add public directory
* Add custom stylesheet

#Auth Pt.1 - Add User Model
* Install all packages needed for auth
* Define User model

#Auth Pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

#Auth Pt.3 - Login
* Add login routes
* Add login template

#Auth Pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Shhow/hide auth links correctly

#Auth Pt.5 - Show/Hide links
* Show/Hide auth links in navbar correctly


##This is the beginning of v7 ##
* Use Express router to reorganize all routes

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

##This is the beginning of v10 ##
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

#Authorization Part 1 Comments
#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

/campgrounds/:id/edit
/campgrounds/:id/comments/:comment_id/edit


#Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route: /campgrounds/:id/comments/:comment_id

#Authorization Part 2: Comments




#RESTful routes
name	url			verb	description
==================================================================================
INDEX	/dogs		GET		Display a list of all dogs
NEW		/dogs/new	GET		Displays a new form to make a new dog
CREATE	/dogs		POST	Add new dog to DB
SHOW	/dogs/:id	GET		Shows info of one dog


INDEX	/campgrounds		GET		Display a list of all dogs
NEW		/campgrounds/new	GET		Displays a new form to make a new dog
CREATE	/campgrounds		POST	Add new dog to DB
SHOW	/campgrounds/:id	GET		Shows info of one dog

#nested routes
NEW		campgrounds/:id/comments/new	GET
CREATE	campgrounds/:id/comments		POST




