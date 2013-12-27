Messages = new Meteor.Collection('messages');

Meteor.methods({
  postMessage : function (text, roomId) {
    var message, room;

    //Add the user as a participant, if it is not already
    Rooms.update(roomId, {$addToSet: {participants: Meteor.userId()}});

    message = {
      text: text,
      timestamp: Date.now(),
      sender : {
        userId: Meteor.userId(),
        userName: getUserName(Meteor.user())
      },
      roomId: roomId
    };

    Messages.insert(message);

    room = Rooms.findOne(roomId);

    _.each(room.participants, function (userId) {
      Meteor.call("createNotification", roomId, userId);
    });
  }
});