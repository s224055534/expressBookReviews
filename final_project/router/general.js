const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !paswword) {
    return res.status(404).json({
        message: "Unable to register user"
    });
  }
  if (!isValid(username)) {
    users.push({
        username: username,
        password: password
    });
    return res.status(200).json({
        message: "User successfully registered. Now you can login."
    });
  }
  return res.status(404).json({
    message: "User already exists!"
    });
});

// Get the book list available in the shop
public_users.get('/async/books', async (req, res) => {
  //Write your code here
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
        message: 'Error retrieving books'
    });
  }
});

// Get book details based on ISBN
public_users.get('/async/isbn/:isbn', async (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
        message: 'Error retrieving book'
    });
  }
});  
// Get book details based on author
public_users.get('/async/author/:author', async (req, res) => {
  //Write your code here
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
  } catch (error) {
    return res.status(500).json({
        message: "Error retrieving books by author"
    });
  }
});
// Get all books based on title
public_users.get('/async/title/:title', async (req, res) => {
  //Write your code here
  const title = req.params.title;

  try {
    const response = axios.get(`http://localhost:5000/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({
        message: "Error retrieving books by title"
    });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
