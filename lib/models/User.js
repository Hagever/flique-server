var Promise = require('bluebird');
var db = require('../db');

class User {
  constructor(user) {
    this.userData = user;

    // create the user
    this.createUser();
  }

  createUser() {
    console.log('Creating new user');
    var createQuery = `
      CREATE (u:User { username: { username }, 
                       password: { password },
                       fullName: { fullname },
                       facebookId: { facebookId } })
      RETURN u
    `;

    console.log(createQuery);
    return db.cypherQuery(createQuery, {
      username: this.userData.username,
      password: this.userData.password,
      fullname: this.userData.fullname,
      facebookId: this.userData.facebookId
    }, function(err, result) {
      if (err) return console.log('err: ' + err);
      if (result) { 
        console.log(result);
        return result;
      }
    });

    // return db.promisedQuery(createQuery, {
    //   username: this.userData.username,
    //   password: this.userData.password,
    //   fullname: this.userData.fullname,
    //   facebookId: this.userData.facebookId
    // })
    // .then(function(result) {
    //   if (result) return result;
    // })
    // .error(function(err) {
    //   console.log('err: ' + err);
    //   return err;
    // }); 
  }

  getMeetups() {
    var query = `
      match (u:User {username: { username }})-[:CHECKED_IN]-(m:Meetup) return m
    `;

    return db.promisedQuery(query, {
      username: this.userData.username
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      console.log('err: ' + err);
      return err;
    }); 
  }

  getConnectionsInMeetup(meetup) {
    var query = `
      match (me:User {username: { username }})--(f:Flique)--(m:Meetup {name: { meetupName }})
      match (f)--(u:User)
      where u.username <> { username }
      return u
    `;

    return db.promisedQuery(query, {
      username: this.userData.username,
      meetupName: meetup.meetupName
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