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

    return db.promisedQuery(createQuery, {
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
    
  }
}