const express = require('express');
const debug = require('debug')('flique');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./api'));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  const view = path.resolve(__dirname, '../views/react.ejs');
  res.render(view);
});

app.use('/api', require('./api'));
io.on('connection', socket => {
  setTimeout(() => {
    socket.emit('node', {
      id: 1,
      shape: 'circularImage',
      image: 'https://graph.facebook.com/omritzek/picture?width=100&height=100'
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

server.listen(process.env.PORT || 1338, () => {
  const { address, port } = server.address();
  console.log(`listening on ${address}:${port}...`);
});
