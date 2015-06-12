const { Router } = require('express');
const router = new Router();
const users = require('./users');
const fliques = require('./flique');
const UserActions = require('actions/user');

router.use((req, res, next) => {
  UserActions.findByToken({ token: req.query.token }).then(user => {
    req.user = user;
    next();
  }).catch(() => {
    res.status(401).send("Unauthorized");
  });
});

router.use('/users', users);

router.use('/flique', fliques);

module.exports = router;
