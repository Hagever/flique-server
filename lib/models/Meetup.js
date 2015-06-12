var db = require('../db');

class Meetup {
  constructor(meetup) {
    this.meetupData = meetup;
    this.createMeetup();
  }

  createMeetup() {
    var createQuery = `
      CREATE (m:Meetup {name: { meetupName }, 
                        location: { location })
      RETURN m
    `;

    return db.promisedQuery(createQuery, {
      meetupName: this.meetupData.meetupName,
      location: this.meetupData.location
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      return err;
    }); 
  }

  getMeetupUsers() {
    var query = `
      match (meetup:Meetup {name: { meetupName }})-[:CHECKED_IN]-(u:User) return u
    `;

    return db.promisedQuery(query, {
      meetupName: this.meetupData.meetupName
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      return err;
    });
  }

  getMeetupFliques() {
    var query = `
      match (meet:Meetup {name: { meetupName })--(f:Flique)
      match (from:User)--(f)--(to:User)
      return from, to
    `;

    return db.promisedQuery(query, {
      meetupName: this.meetupData.meetupName
    })
    .then(function(result) {
      if (result) return result;
    })
    .error(function(err) {
      return err;
    });
  }
}