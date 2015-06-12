var Promise = require('bluebird');
var db = require('../db');

class User {
	constructor(user) {
		this.userData = user;

		// create the user
		this.createUser();
	}

	createUser() {
		var createQuery = `
			create (n:User {username: { username }, 
									  password: { password }.
									  fullName: { fullname },
									  facebookId: { facebookId })
		`;

		return db.promisedQuery(createQuery, {
			username: this.userData.username,
			password: this.userData.password,
			fullname: this.userData.fullname,
			facebookId: this.userData.facebookId
		})
		.then(function(result) {
			if (result) return result;
		})
		.error(function(err) {
			return err;
		}); 
	}


}

module.exports = User;