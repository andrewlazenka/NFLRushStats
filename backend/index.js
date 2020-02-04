const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const routes = require('./routes')

const graphQLServer = express();
const corsOptions = {
  origin: function (_, callback) {
    callback(null, true)
  },
  credentials: true,
  optionsSuccessStatus: 200
}

graphQLServer.use(cors(corsOptions))
graphQLServer.options('*', cors())
graphQLServer.use(bodyParser.json())
graphQLServer.use(bodyParser.urlencoded({ extended: true }))

graphQLServer.use('/', routes);

graphQLServer.listen(8000, () =>
  console.log(`Application is now running on port 8000`)
)
