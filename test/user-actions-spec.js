const UserActions = require('actions/user');

describe('UserActions', () => {
  describe('login', () => {
    it('should work if the password and username are correct', (done) => {
      UserActions.login({ username: 'test', password: 'test123' }).then(() => done()).catch(done);
    });

    it('should throw if the password is incorrect', (done) => {
      UserActions.login({ username: 'test', password: 'something else' }).then(done).catch(() => done());
    });

    it('should throw if there is no user', (done) => {
      UserActions.login({ username: 'someoneee elseeee', password: 'whatever' }).then(done).catch(() => done());
    });

    it('user should not be case sensitive', (done) => {
      UserActions.login({ username: 'TEST', password: 'test123' }).then(() => done()).catch(done);
    });

    it('password should be case sensitive', (done) => {
      UserActions.login({ username: 'test', password: 'TEST123' }).then(done).catch(() => done());
    });

    describe('tokens', () => {
      var token;
      before((done) => {
        UserActions.login({ username: 'test', password: 'test123' }).then(user => {
          token = user.token;
          done();
        });
      });

      it('should find the user by the given token', (done) => {
        UserActions.findByToken({ token }).then(() => {
          done();
        }).catch(done);
      });

      it('should not find the user by the wrong token', (done) => {
        UserActions.findByToken({ token: 'abanibi' }).then(done).catch(() => done());
      });
    });
  });
  describe('find a user', () => {
    it('should throw when user not found', (done) => {
      UserActions.findByUsername('whattttt').then(done).catch(() => done());
    });

    it('should find the user when its okay', (done) => {
      UserActions.findByUsername('test').then(() => done()).catch(done);
    });
  });
});
