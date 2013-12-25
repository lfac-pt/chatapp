Meteor.publish("usersData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1}});
});

Meteor.publish('rooms', function() {
  return Rooms.find({isPrivate: {$ne: true}});
});

Meteor.publish('singleRoom', function(roomId) {
  return Rooms.find(roomId);
});

Meteor.publish('roomMessages', function(roomId) {
  var room;

  room = Rooms.findOne(roomId);

  if (room.isPrivate === true && !_.contains(room.participants, this.userId)) {
    throw new Meteor.Error(405, "You cannot acess these messages");
  }

  return Messages.find({roomId: roomId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});