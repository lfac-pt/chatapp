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

stringColorHash = function (str) {
  var rgb, i;

  rgb = [0, 0, 0];

  for (i = 0; i < str.length; i++) {
    rgb[i % 3] += str.charCodeAt(i);
  }

  rgb = rgb.map(function (value) {
    return (value % 210) + 20; //Avoid complete black or white
  });

  return "rgb(" + rgb.join(",") + ")";
};