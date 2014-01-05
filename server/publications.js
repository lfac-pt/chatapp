Meteor.publish("usersData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1}});
});

Meteor.publish('rooms', function() {
  return Rooms.find({$or: [
    {isPrivate: {$ne: true}},
    {participants: {$all: [this.userId]}}
  ]});
});

Meteor.publish('singleRoom', function(roomId) {
  return Rooms.find(roomId);
});

Meteor.publish('roomMessages', function(roomId, messagesLimit) {
  var room;

  room = Rooms.findOne(roomId);

  if (!room) {
    throw new Meteor.Error(404, "The room does not exist");
  }

  if (room.isPrivate === true && !_.contains(room.participants, this.userId)) {
    throw new Meteor.Error(405, "You cannot acess these messages");
  }

  return Messages.find({roomId: roomId}, {limit: messagesLimit, sort: {timestamp: -1}});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});