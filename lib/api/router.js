const { Router } = require('express');

const none = (req, res) => {
  res.send(`api not implemented`);
};

module.exports = ({ show, list, destroy, insert, update }) => {
  const router = new Router();
  router.get('/', list || none);
  router.get('/:id', show || none);
  router.delete('/:id', destroy || none);
  router.put('/:id', update || none);
  router.post('/', insert || none);
  return router;
};
