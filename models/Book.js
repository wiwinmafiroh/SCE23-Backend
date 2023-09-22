const mongoose = require("mongoose");

// Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      unique: true,
      required: true,
    },
    genre: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Book Model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
