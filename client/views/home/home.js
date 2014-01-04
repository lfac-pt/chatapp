Template.home.helpers({
  rooms: function() {
    return Rooms.find().map(function (room) {
      if (room.isPrivate) {
        room.name = getPrivateRoomName(room);
      }

      if (Notifications.findOne({roomId: room._id, read: false, userId: Meteor.userId()})) {
        room.highlightClass = "ca-highlight";
      }

      return room;
    });
  },
  users : function () {
    return Meteor.users
      .find()
      .fetch()
      .filter(function (user) {
        return user._id !== Meteor.userId();
      })
      .map(function (user) {
        if (!user.name) {
          return _.extend(user, {name: _.first(user.emails).address});
        }
      });
  },
  userColor : function () {
    return stringColorHash(this._id);
  }
});

Template.home.events({
  "click .ca-nasty-fake-btn" : function () {
    Meteor.call('getARoom', this, function(error, roomId) {
      if (error){
        console.error(error.reason);
      } else {
        Router.go('room', {_id: roomId});
      }
    });
  }
});