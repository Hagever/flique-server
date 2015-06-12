const { Router } = require('express');
const router = new Router();
const users = require('./users');
const fliques = require('./flique');
const sessions = require('./sessions');
const UserActions = require('actions/user');
const forbiddenFruit = (router) => {
  return (req, res, next) => {
    UserActions.findByToken({ token: req.query.token }).then(user => {
      req.user = user;
      return router(req, res, next);
    }).catch(() => {
      res.status(401).send("Unauthorized");
    });
  };
};

router.use('/sessions', sessions);
router.use('/users', forbiddenFruit(users));
router.use('/flique', fliques);

module.exports = router;
