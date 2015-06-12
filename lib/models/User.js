var Promise = require('bluebird');
var db = require('../db');

class User {
  static createUser({ username, password, fullname, facebookId }) {
    console.log('Creating new user');
    var createQuery = `
      CREATE (u:User { username: { username }, 
                       password: { password },
                       fullName: { fullname },
                       facebookId: { facebookId } })
      RETURN u
    `;

    return db.promisedQuery(createQuery, {
      username,
      password,
      fullname,
      facebookId,
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      console.log('err: ' + err);
      return err;
    }); 
  }

  static getMeetups( { username }) {
    var query = `
      match (u:User {username: { username }})-[:CHECKED_IN]-(m:Meetup) return m
    `;

    return db.promisedQuery(query, {
      username
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      console.log('err: ' + err);
      return err;
    }); 
  }

  static getConnectionsInMeetup({ username, meetupName }) {
    var query = `
      match (me:User {username: { username }})--(f:Flique)--(m:Meetup {name: { meetupName }})
      match (f)--(u:User)
      where u.username <> { username }
      return u
    `;

    return db.promisedQuery(query, {
      username,
      meetupName
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

module.exports = User;