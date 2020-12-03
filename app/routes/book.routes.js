module.exports = (app) => {
  const books = require("../controllers/book.controller.js");

  // Create a new book
  app.post("/books", books.create);

  // Get all books
  app.get("/books", books.getAll);

  // Get a single book passing the book id
  app.get("/books/:bookId", books.getById);

  // Update a book passing the book id
  app.put("/books/:bookId", books.update);

  // Delete a book passing the book id
  app.delete("/books/:bookId", books.delete);
};
