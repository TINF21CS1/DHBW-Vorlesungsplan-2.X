const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.listen(8000, () => {
    console.log("Listening 0.0.0.0:8000");
});