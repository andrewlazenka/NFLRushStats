const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const routes = require('./routes')

const app = express();
const corsOptions = {
  origin: function (_, callback) {
    callback(null, true)
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes);

app.listen(8000)

module.exports = app
