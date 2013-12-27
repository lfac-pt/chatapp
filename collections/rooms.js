Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  getARoom : function (targetUser) {
    var roomId, existingRoom;

    //Find an existing private room that only has booth
    //participants, if there is one
    /**
    TODO: change to this, when minimongo supports it:
    {participants: {
        $and: [
          {$all: [Meteor.userId(), targetUser._id]},
          {$size: 2}
        ]
      }}
    */
    existingRoom = Rooms.findOne({$and: [
      {isPrivate: true},
      {participants: {$all: [Meteor.userId(), targetUser._id]}}
    ]});

    if (existingRoom) {
      roomId = existingRoom._id;
    } else {
      //If there is no room yet, create it
      roomId = Rooms.insert({
        isPrivate: true,
        participants: [Meteor.userId(), targetUser._id]
      });
    }

    return roomId;
  }
});