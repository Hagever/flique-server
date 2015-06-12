var Promise = require('bluebird');
var db = require('../db');

class Flique {
  static create({ from, to, meetup }) {
    var query = `
      match (me:User { username: { username })})
    `;
  }
}

module.exports = Flique;