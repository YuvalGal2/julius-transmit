const emit = require("./emit.js")
const http = require('http');
var express = require('express')
var cors = require('cors')
const hostname = '127.0.0.1';
const port = 4567;

const app = express()
app.use(express.json());
app.use(cors())

app.post('', function (req, res, next) {
    console.log(req.body);
    res.json(req.body)
})

app.listen(4567, function () {
    console.log('CORS-enabled web server listening on port 80')
})
