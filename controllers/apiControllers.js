const User = require("../models/User");
const Book = require("../models/Book");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");

module.exports = {
  landingPage: (req, res) => {
    res.send(
      "Welcome to the BiblioCatalog Application. Manage your book collection here!"
    );
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Both username and password are required.",
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid username or password.",
        });
      }

      res.status(200).json({ message: "Login successful." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json({
        message: "Book data has been successfully added.",
        book: newBook,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBooks: async (req, res) => {
    try {
      const { title, author, genre } = req.query;
      const query = {};

      if (title) {
        query.title = title;
      }

      if (author) {
        query.author = author;
      }

      if (genre) {
        query.genre = genre;
      }

      let books;

      if (Object.keys(query).length > 0) {
        books = await Book.find(query);
      } else {
        books = await Book.find();
      }

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBookByID: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID." });
      }

      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBookByID: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID." });
      }

      const book = await Book.findByIdAndUpdate(id, req.body);

      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }

      const updatedBook = await Book.findById(id);

      res.status(200).json({
        message: "Book data has been successfully updated.",
        book: updatedBook,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBookByID: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID." });
      }

      const book = await Book.findByIdAndDelete(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }

      res.status(200).json({ message: "Book successfully deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
