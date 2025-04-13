const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const auth = require('../middleware/auth');

router.get('/', booksController.getAllBooks);
router.get('/isbn/:isbn', booksController.getBookByISBN);
router.get('/author/:author', booksController.getBooksByAuthor);
router.get('/title/:title', booksController.getBooksByTitle);
router.get('/review/:isbn', booksController.getBookReview);
router.put('/review/:isbn', auth, booksController.addOrModifyReview);
router.delete('/review/:isbn', auth, booksController.deleteReview);

module.exports = router;