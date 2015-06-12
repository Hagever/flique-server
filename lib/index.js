const express = require('express');
const debug = require('debug')('flique');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);
const facebookImage = user => `https://graph.facebook.com/${user}/picture?width=100&height=100`;

app.use('/api', require('./api'));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  const view = path.resolve(__dirname, '../views/react.ejs');
  res.render(view);
});

io.on('connection', socket => {
  setTimeout(() => {
    socket.emit('node', {
      id: 1,
      shape: 'circularImage',
      image: facebookImage('omritzek')
    });
  }, 1000);

  setTimeout(() => {
    socket.emit('edge', {
      from: 1, to: 3
    });
  }, 2000);

  setTimeout(() => {
    socket.emit('edge', {
      from: 1, to: 2
    });
  }, 5000);
});

server.listen(process.env.PORT || 1337, () => {
  const { address, port } = server.address();
  debug(`listening on ${address}:${port}...`);
});
