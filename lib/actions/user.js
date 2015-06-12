var BBPromise = require('bluebird');
var uuid = require('node-uuid').v4;
var db = require('db');

const userWithoutPassword = (user) => {
  let { password, ...other } = user;
  return other;
};

const findByUsername = (username) => {
  return db.promisedQuery(`
    MATCH (user:User)
    WHERE lower(user.username) = lower({username})
    RETURN user
  `, {
    username,
  }).then(results => {
    const userInfo = results.data[0];
    if (!userInfo) throw new Error("user not found");
    return userWithoutPassword(userInfo);
  });
};

const login = ({ username, password }) => {
  const token = uuid();
  return db.promisedQuery(`
    MATCH (me:User)
    WHERE lower(me.username) = lower({username}) AND me.password = {password}
    SET me.token = { token }
    RETURN me
  `, {
    username,
    password,
    token
  }).then(results => {
    const userInfo = results.data[0];
    if (!userInfo) throw new Error("user/pass not okay");
    return userWithoutPassword(userInfo);
  });
};

const findByToken = ({ token }) => {
  return db.promisedQuery(`
    MATCH (me:User { token: { token } })
    RETURN me
  `, { token }).then(results => {
    const userInfo = results.data[0];
    if (!userInfo) throw new Error("not found");
    return userWithoutPassword(userInfo);
  });
};

module.exports = {
  login,
  findByToken,
  findByUsername
};
