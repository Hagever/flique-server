const express = require('express');
const debug = require('debug')('flique');
const app = express();
const models = require('models');
const server = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('welcome to flique.');
});

app.use('/api', require('./api'));

server.listen(process.env.PORT || 1337, () => {
  const { address, port } = server.address();
  debug(`listening on ${address}:${port}...`);
});
