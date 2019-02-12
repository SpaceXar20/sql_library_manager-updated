//this file will be where I will create the routes to show,post,update,delete books

//I will use the require method to require the express module
const express = require('express');

//Set up other routes by using the Router constructor to create a router instance
const router = express.Router();

var Book = require("../models").Book; //require book model into books.js route file


// create 'get /' - Shows the full list of books. and catch error
router.get('/', function(req, res, next) { 
  Book.findAll({order: [["Title", "ASC"]]}).then(function(books){ //use findAll method to grab data from the database, and dynamically create a table using the data in index.pug
    //  console.log(books)
    res.render('index.pug', {books: books, title: "Books"}); //Render the index.pug file and pass it the books data from the function in order to create the tables
  }); 
}); 


/*This route shows the new book form
Create get/books/new route. 
*** I noticed that /books/new didn't work but /new did*/
router.get('/new', function(req, res, next) {
  res.render('new-book.pug', {books: Book.build(), title: "New Book"}); //most likely render new-book.pug
});


/*Post a new book to the database
This makes the post /books/new route. */
router.post('/new', function(req, res, next) {
  Book.create(req.body).then(function(book){ //to create a model, use create method, req.body is the data from the form
    res.redirect("/books/" + book.id) //when the database is finished saving the new book record, the db will redirect to the new book 
  });  
});


/*Show books detail form, ** STUCK ON THIS PART!!***
Create get /books/:id route */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){
    res.render('update-book.pug', {book: book, title: "Update Book"}) //most likely render the pug file for each books detail
    // console.log(book)
  })
 });


/* - Updates book info in the database.  ** STUCK ON THIS PART!!***
create the post /books/:id route */
router.put('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){
    // console.log(book)
    return book.update(req.body);    
  }).then(function(book) { //once the update() returns a promise , we can redirect to the individual book page
    res.redirect("/books/" + book.id)   
  });
});


/* - Deletes a book. Careful, this can’t be undone. 
It can be helpful to create a new “test” book to test deleting.

create the post /books/:id/delete route*/
router.delete('/:id/delete', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){//once the book is found, we can destroy it
    return book.destroy(); //the destroy() is an asynchronous call that returns a promise, once fulfilled we can redirect to /books path 
  }).then(function(){
  res.redirect('/books');
  console.log(book)
  });
});



module.exports = router; //export the router to reference it in the app.js file 