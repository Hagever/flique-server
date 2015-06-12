const router = require('./router');
const UserActions = require('actions/user');
const User = require('models/User');

const show = (req, res) => {
  UserActions.findByUsername(req.params.id).then(user => {
    const { token, ...userData } = user;
    res.send(userData);
  }).catch(() => {
    res.status(400).send("not found.");
  });
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
  var data = {
    username: req.params['username'],
    password: req.params['password'],
    facebookId: req.params['facebookId'],
    fullName: req.params['fullName']
  };

  new User(data);

  res.send(`insert node`);
};

module.exports = router({
  show,
  list,
  update,
  destroy,
  insert
});
