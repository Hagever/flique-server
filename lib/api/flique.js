const router = require('./router');

const show = (req, res) => {
  req.send('hello');
};

const list = (req, res) => {
  res.status(403).send(`Forbidden.`);
};

const update = (req, res) => {
  res.send(`update ${req.params.id}`);
};

const destroy = (req, res) => {
  res.send(`removing ${req.params.id}`);
};

const insert = (req, res) => {
  res.send('creating a flique');
};

module.exports = router({
  show,
  list,
  update,
  destroy,
  insert
});