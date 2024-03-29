const index = require('./index.js');

const express = require('express');
const app = express();
const port = 3001;

app.get('/', async (req, res) => {
    const resp = await index.handler();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.send(resp.body);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
