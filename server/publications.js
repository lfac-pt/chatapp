Meteor.publish("usersData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1}});
});

Meteor.publish('rooms', function() {
  /*TODO: only publish the rooms that the user has acess to*/
  return Rooms.find({});
});

Meteor.publish('roomMessages', function(roomId) {
  return Messages.find({roomId: roomId});
});