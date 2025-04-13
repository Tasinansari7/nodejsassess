const fs = require('fs');
const path = require('path');
const booksFilePath = path.join(__dirname, '../data/books.json');

const readBooks = () => {
    const data = fs.readFileSync(booksFilePath);
    return JSON.parse(data);
};

const writeBooks = (data) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
};

exports.getAllBooks = (req, res) => {
    const books = readBooks();
    res.json(books);
};

exports.getBookByISBN = (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.isbn === req.params.isbn);
    res.json(book || {});
};

exports.getBooksByAuthor = (req, res) => {
    const books = readBooks();
    const result = books.filter(b => b.author === req.params.author);
    res.json(result);
};

exports.getBooksByTitle = (req, res) => {
    const books = readBooks();
    const result = books.filter(b => b.title === req.params.title);
    res.json(result);
};

exports.getBookReview = (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.isbn === req.params.isbn);
    res.json(book ? book.reviews : {});
};

exports.addOrModifyReview = (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        book.reviews[req.user] = req.body.review;
        writeBooks(books);
        res.json({ message: 'Review added/updated.' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

exports.deleteReview = (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book && book.reviews[req.user]) {
        delete book.reviews[req.user];
        writeBooks(books);
        res.json({ message: 'Review deleted.' });
    } else {
        res.status(404).json({ message: 'Review not found or unauthorized' });
    }
};