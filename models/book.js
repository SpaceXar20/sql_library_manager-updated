/*this is the Book model, the attributes here have the same name
as the columns from the Books table from "library.db"*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must have a title!" //validate title and author so that they can't be submitted blank
        }
      }
    }, 
    author:{
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "The author's name is needed!"
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};