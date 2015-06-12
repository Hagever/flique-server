var BBPromise = require('bluebird');

const data = [{
  username: 'gal',
  fullName: 'Gal Schlezinger',
  password: '123',
  token: 'galgal',
}, {
  username: 'kfir',
  fullName: 'Kfir Strikovsky',
  password: '123',
  token: 'kfirkfir',
}, {
  username: 'omri',
  fullName: 'Omri Lachman',
  password: '123',
  token: 'omriomri',
}, {
  username: 'avihay',
  fullName: 'Avihay Shem-Tov',
  password: '123',
  token: 'police',
}, {
  username: 'golan',
  fullName: 'Golan Levi',
  password: '123',
  token: 'golangolan',
}, {
  username: 'test',
  fullName: 'Test the Tester',
  password: 'test123',
  token: 'testingtesting',
}];

const userWithoutPassword = (user) => {
  let { password, ...other } = user;
  return other;
};

const findByUsername = (id) => {
  return new BBPromise((resolve, reject) => {
    const user = data.filter(user => (user.username === id))[0];
    if (!user) {
      return reject(new Error('user not found'));
    } else {
      return resolve(userWithoutPassword(user));
    }
  });
};

const findByUsernameAndPassword = ({ username, password }) => {
  return new BBPromise((resolve, reject) => {
    const user = data.filter(user => (
      user.username.toLowerCase() === username.toLowerCase() && user.password === password
    ))[0];
    if (!user) {
      return reject(new Error('User and password arent that great'));
    } else {
      return resolve(userWithoutPassword(user));
    }
  });
};

const findByToken = ({ token }) => new Promise((resolve, reject) => {
  const user = data.filter(user => user.token === token)[0];
  if (!user) {
    return reject(new Error('Token not found'));
  } else {
    return resolve(userWithoutPassword(user));
  }
});

module.exports = {
  findByUsernameAndPassword,
  findByToken,
  findByUsername
};
