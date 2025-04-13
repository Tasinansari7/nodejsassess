const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsers = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

exports.register = (req, res) => {
    const users = readUsers();
    const exists = users.find(u => u.username === req.body.username);
    if (exists) return res.status(400).json({ message: 'User exists' });

    users.push(req.body);
    writeUsers(users);
    res.json({ message: 'User registered' });
};

exports.login = (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', token: req.body.username });
};