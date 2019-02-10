//This file will be where I will create my home route

//I will use the require method to require the express module
const express = require('express'); //require express module

//I will set up the home route by using the Router constructor to create a router instance
const router = express.Router();

/*get / - Home route should redirect to the /books route*/
router.get('/', function(req, res, next) {
   res.redirect('/books')
});

module.exports = router; //export the router to reference it in the app.js file 