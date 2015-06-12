const UserActions = require('../lib/actions/user');

describe('UserActions', () => {
  it('should work if the password and username are correct', (done) => {
    UserActions.findByUsernameAndPassword({ username: 'test', password: 'test123' }).then(() => done()).catch(done);
  });

  it('should throw if the password is incorrect', (done) => {
    UserActions.findByUsernameAndPassword({ username: 'test', password: 'something else' }).then(done).catch(() => done());
  });

  it('should throw if there is no user', (done) => {
    UserActions.findByUsernameAndPassword({ username: 'someoneee elseeee', password: 'whatever' }).then(done).catch(() => done());
  });

  it('user should not be case sensitive', (done) => {
    UserActions.findByUsernameAndPassword({ username: 'TEST', password: 'test123' }).then(() => done()).catch(done);
  });

  it('password should be case sensitive', (done) => {
    UserActions.findByUsernameAndPassword({ username: 'test', password: 'TEST123' }).then(done).catch(() => done());
  });
});
