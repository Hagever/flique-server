const router = require('./router');

const show = (req, res) => {
  req.send('hello');
};

const list = (req, res) => {
  res.status(403).send(`Forbidden.`);
};

const insert = (req, res) => {
  
};

module.exports = router({
  show,
  list,
  insert
});