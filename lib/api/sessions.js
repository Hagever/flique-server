const router = require('./router');
const UserActions = require('actions/user');

const create = (req, res) => {
  const { username, password } = req.body;
  UserActions.login({ username, password }).then(userInfo => {
    res.send(userInfo);
  }).catch(err => {
    console.error(err);
    res.status(400).send('cannot log in');
  });
};

module.exports = router({
  create
});
