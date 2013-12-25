getUserName = function (user) {
  if (user.name) {
    return user.name;
  } else if (user.username) {
    return user.username;
  } else {
    return _.first(user.emails).address;
  }
};

getPrivateRoomName = function (room) {
  var participants;

  participants = room.participants.filter(function (userId) {
    return userId !== Meteor.userId();
  });

  return "Chat with " + participants.map(function (userId) {
          return getUserName(Meteor.users.findOne(userId));
        }).join(", ");
};