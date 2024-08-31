require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');
console.log(process.env.LOGIN)
console.log(process.env.PASSWORD)
console.log(process.env.DB_URL)
mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+'@'+process.env.DB_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
// Middleware permettant à Express d'extraire le corps JSON des requêtes POST
app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use('/api/auth', userRoutes);
// app.use('/api/books', booksRoutes);

module.exports = app;