const { Router } = require('express');
const router = new Router();
const users = require('./users');
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

router.use('/users', forbiddenFruit(users));

module.exports = router;
