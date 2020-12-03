const Book = require("../models/book.model");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request for required field
  if (!req.body.title) {
    return res.status(400).send({
      message: "The book title is required",
    });
  }

  // Create a book
  const book = new Book({
    title: req.body.title,
    author: req.body.author || "Unkown Author",
  });

  // Save the Book in the database
  book
    .save()
    .then((oBook) => {
      res.send(oBook);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the book.",
      });
    });
};

// Get and return all Books
exports.getAll = (req, res) => {
  Book.find()
    .then((oBook) => {
      res.send(oBook);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving the book.",
      });
    });
};

// Get a single book
exports.getById = (req, res) => {
  Book.findById(req.params.bookId)
    .then((oBook) => {
      if (oBook) {
        res.send(oBook);
      }
      return res.status(404).send({
        message: `Book with id ${req.params.bookId} not found`,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Book with id ${req.params.bookId} not found`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving Book with id ${req.params.bookId}`,
      });
    });
};

// Update a book
exports.update = (req, res) => {
  // Validate request for required field
  if (!req.body.title) {
    return res.status(400).send({
      message: "The book title is required",
    });
  }

  // Find and update a Book
  Book.findByIdAndUpdate(
    req.params.bookId,
    {
      title: req.body.title,
      author: req.body.author || "Unknown",
    },
    { new: true }
  )
    .then((oBook) => {
      if (oBook) {
        res.send(oBook);
      }
      return res.send({
        message: `Book with id ${req.params.bookId} not found`,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Book with id ${req.params.bookId} not found`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving Book with id ${req.params.bookId}`,
      });
    });
};

// Delete a Book
exports.delete = (req, res) => {
  Book.findByIdAndRemove(req.params.bookId).then((oBook) => {
    if (oBook) {
      res.send({ message: "The Book has been deleted!" });
    }
    return res
      .status(404)
      .send({
        message: `Book with id ${req.params.bookId} not found`,
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "Notfound") {
          return res.status(404).send({
            message: `Book with id ${req.params.bookId} not found`,
          });
        }
        return res.status(500).send({
          message: `Error deleting Book with id ${req.params.bookId}`,
        });
      });
  });
};
