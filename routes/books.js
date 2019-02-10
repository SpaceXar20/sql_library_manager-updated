//this file will be where I will create the routes to show,post,update,delete books

//I will use the require method to require the express module
const express = require('express');

//Set up other routes by using the Router constructor to create a router instance
const router = express.Router();

var Book = require("../models").Book; //require book model into books.js route file


// create get /books - Shows the full list of books. and catch error
router.get('/', function(req, res, next) { 
  Book.findAll({order: [["Title", "ASC"]]}).then(function(books){ //use findAll method to grab data from the database, and order the books alphabetically by Title
    //  console.log(books)
    res.render('index.pug', {books: books, title: "Books"}); //Render the index.pug file and pass it the books data from the function in order to create the tables
  }); 
}); 


/*This route shows the new book form
Create get/books/new route. */
router.get('/books/new', function(req, res, next) {
  res.render('new-book.pug', {books: Book.build(), title: "New Book"}); //most likely render new-book.pug
});


/*Post a new book to the database
This makes the post /books/new route. */
router.post('/books/new', function(req, res, next) {
  res.render('') //most likely render update-books.pug
});


/*Show books detail form
Create get /books/:id route */
router.get('/books/:id', function(req, res, next) {
  res.render('update-book.pug') //most likely render the pug file for each books detail
});


/* - Updates book info in the database.
create the post /books/:id route */
router.post('/books/:id', function(req, res, next) {
  res.render('')
});


/* - Deletes a book. Careful, this can’t be undone. 
It can be helpful to create a new “test” book to test deleting.

create the post /books/:id/delete route*/
router.post('/books/:id/delete', function(req, res, next) {
  res.render('')
});



module.exports = router; //export the router to reference it in the app.js file 