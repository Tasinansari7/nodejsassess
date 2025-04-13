const axios = require('axios');

const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/books');
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
};

const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:3000/books/isbn/${isbn}`)
        .then(response => console.log(response.data))
        .catch(err => console.error(err));
};

const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/author/${author}`);
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
};

const getBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/title/${title}`);
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };