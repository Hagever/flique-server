var Promise = require('bluebird');
var db = require('../db');

class Flique {
  static create({ from_user, to_user, meetup }) {
    var query = `
      create (f:Flique {date: { date }})-[:HAPPENED_IN]->(m:Meetup {name: { meetupName }})
      create (from:User {username: { from_username }})-[:FLIQUED]->(f)<-[:FLIQUED]-(to:User {username: { to_username }})
    `;

    return db.promisedQuery(createQuery, {
      date: new Date().toString(),
      meetupName: meetup.meetupName,
      from_username: from_user.username,
      to_username: to_user.username
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      console.log('err: ' + err);
      return err;
    }); 
  }
}

module.exports = Flique;