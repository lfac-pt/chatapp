Messages = new Meteor.Collection('messages');

Meteor.methods({
  postMessage : function (text, roomId) {
    var message;

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

    return Messages.insert(message);
  }
});