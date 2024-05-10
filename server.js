const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv").config();

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', require('./route/UserRoute'));
app.use('/badges', require('./route/BadgeRoute'));

app.listen(PORT, () => {
    console.log(`Running at htpp://localhost:${PORT}`);
});