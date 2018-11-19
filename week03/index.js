const User = require('./models/user').User;
const user = new User();

user.insert({ name: 'Ivan1', age: 20 }, function (err, myUser) {
  user.getById(myUser.id, function(err, sameUser) {
    user.get({"name": myUser.name}, function(users) {
        user.delete({"name": 'Ivan1'}, function(err) {
          console.log(err);
        })
    });
  });
});