const router = require('./router');
const Flique = require('models/Flique');

const show = (req, res) => {
  req.send('hello');
};

const list = (req, res) => {
  res.status(403).send(`Forbidden.`);
};

const insert = (req, res) => {
  var from_user = req.body.from;
  var to_user = req.body.to;
  var meetup = req.body.meeetup;

  if (!from_user || !to_user || !meetup) res.status(400).send('missing data');

  Flique.create({ from_user, to_user, meetup }).then(result => {
    
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send('fml');
  })
};

module.exports = router({
  show,
  list,
  insert
});