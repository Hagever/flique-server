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
    username: req.body.username,
    password: req.body.password,
    facebookId: req.body.facebookId,
    fullname: req.body.fullname
  };

  if (!data.username || !data.password || !data.fullname) return res.status(400).send('missing data');

  User.createUser(data).then((result) => {
    res.send(`insert node`);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send('fml');
  });
};

module.exports = router({
  show,
  list,
  update,
  destroy,
  insert
});
