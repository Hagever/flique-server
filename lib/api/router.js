const { Router } = require('express');

module.exports = ({ show, list, destroy, insert, update }) => {
  const router = new Router();
  router.get('/', list);
  router.get('/:id', show);
  router.delete('/:id', destroy);
  router.put('/:id', update);
  router.post('/', insert);
  return router;
};
