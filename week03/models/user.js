const Base = require('./base').Base;
const USER_DB_NAME = 'users.db';

function User(){
  Base.call(this, USER_DB_NAME);
}

User.prototype = Base.prototype;

module.exports.User = User;