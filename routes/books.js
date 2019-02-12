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
  }).catch(function (err) {
      res.send(500);
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
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){ //if error name is the sequelize type, re-render form if not throw err to be handler by final catch
      res.render('new-book.pug', 
        {book: Book.build(req.body), 
         title: "New Book",
         errors: err.errors //on error property, there is am errors array, we can pass that into view to ve rendered
        });
    } else {
      throw err;
    } 
  }).catch(function (err) {
    res.send(500);
  });  
});


/*Show books detail form, this route allows me to dynamically include book title,author,genre,year in the text fields 
Create get /books/:id route */
router.get('/:id', function(req, res, next) {
  Book.findOne({where: {id: req.params.id}}).then(function(book){
    if(book) { //if the book is present we can show its data, if not we send a 404 error
      res.render('update-book.pug', {book: book, title: "Update Book"}) //most likely render the pug file for each books detail
    } else {
      res.send(404);
    }
  }).catch(function (err) {
    res.send(500);
  });
});


/* - Updates book info in the database. 
create the post /books/:id route */
router.post('/:id', function(req, res, next) {
  Book.findOne({where: {id: req.params.id}}).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      res.send(404)
    }    
  }).then(function(book) { //once the update() returns a promise , we can redirect to the individual book page
    res.redirect("/books/" + book.id)   
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){ //if error name is the sequelize type, re-render forms if not throw err to be handler by final catch
      var book = Book.build(req.body); //when we build a book, we need to give correct id
      book.id = req.params.id; //this will make sure the correct book gets updated

      res.render('update-book.pug', 
      {book: book, 
       title: "Update Book",
       errors: err.errors //on error property, there is am errors array, we can pass that into view to ve rendered
      });
    } else {
      throw err;
    } 
  }).catch(function (err) {
    res.send(500);
  });
});


/* - Deletes a book. Careful, this can’t be undone. 
It can be helpful to create a new “test” book to test deleting.

create the post /books/:id/delete route*/
router.post('/:id/delete', function(req, res, next){
  Book.findOne({where: {id: req.params.id}}).then(function(book){
    if (book){ 
      return book.destroy();
    } else {
      res.send(404)
    }
  }).then(function(){
    res.redirect('/books/'); 
  }).catch(function (err) {
    res.send(500);
  });
});





module.exports = router; //export the router to reference it in the app.js file 