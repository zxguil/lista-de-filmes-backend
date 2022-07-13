require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.port || 8000;

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const uri = `mongodb+srv://${username}:${password}@clusterfilmes.kl6ju.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(port);
    })
    .catch({});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const router = express.Router();
const filmeRoutes = require('./routes/filmeRoutes');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Olá! Bem vindo(a) ao nosso App' });
});

app.use('/api', router);

router.use('/filmes', filmeRoutes);
