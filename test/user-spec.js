const User = require('../lib/models/user');

describe('User', () => {
  it('should work if the password and username are correct', (done) => {
    User.findByUsernameAndPassword({ username: 'test', password: 'test123' }).then(() => done()).catch(done);
  });

  it('should throw if the password is incorrect', (done) => {
    User.findByUsernameAndPassword({ username: 'test', password: 'something else' }).then(done).catch(() => done());
  });

  it('should throw if there is no user', (done) => {
    User.findByUsernameAndPassword({ username: 'someoneee elseeee', password: 'whatever' }).then(done).catch(() => done());
  });

  it('user should not be case sensitive', (done) => {
    User.findByUsernameAndPassword({ username: 'TEST', password: 'test123' }).then(() => done()).catch(done);
  });

  it('password should be case sensitive', (done) => {
    User.findByUsernameAndPassword({ username: 'test', password: 'TEST123' }).then(done).catch(() => done());
  });
});
