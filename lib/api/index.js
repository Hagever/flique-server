const { Router } = require('express');
const router = new Router();
const users = require('./users');
const UserActions = require('actions/user');

router.use((req, res, next) => {
  console.log('router');
  UserActions.findByToken({ token: req.query.token }).then(user => {
    req.user = user;
    next();
  }).catch(() => {
    res.status(401).send("Unauthorized");
  });
});

router.use('/users', users);

module.exports = router;
