getUserName = function (user) {
  if (user.name) {
    return user.name;
  } else if (user.username) {
    return user.username;
  } else {
    return _.first(user.emails).address;
  }
};