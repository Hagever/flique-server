const express = require('express');
const debug = require('debug')('flique');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

app.use('/api', require('./api'));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  const view = path.resolve(__dirname, '../views/react.ejs');
  res.render(view);
});

server.listen(process.env.PORT || 1337, () => {
  const { address, port } = server.address();
  debug(`listening on ${address}:${port}...`);
});
