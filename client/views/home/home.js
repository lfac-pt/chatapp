Template.home.helpers({
  rooms: function() {
    return Rooms.find().map(function (room) {
      if (room.isPrivate) {
        room.name = getPrivateRoomName(room);
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
  }
});

Template.home.events({
  "click button" : function () {
    Meteor.call('getARoom', this, function(error, roomId) {
      if (error){
        console.error(error.reason);
      } else {
        Router.go('room', {_id: roomId});
      }
    });
  }
});