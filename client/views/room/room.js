Template.room.helpers({
  roomName : function () {
    if (this.room.isPrivate) {
      return getPrivateRoomName(this.room);
    }
    return this.room.name;
  }
});

Template.room.events({
  'submit form': function(e) {
    e.preventDefault();

    var message, input;

    //Add the user as a participant, if it is not already
    if (!_.contains(this.room.participants, Meteor.userId())) {
      Rooms.update(this.room._id, {$push: {participants: Meteor.userId()}});
    }

    input = $(e.target).find('[name=text]');
    message = {
      text: input.val(),
      timestamp: Date.now(),
      sender : {
        userId: Meteor.userId(),
        userName: getUserName(Meteor.user())
      },
      roomId: this.room._id
    };

    Messages.insert(message);

    input.val("");
  }
});