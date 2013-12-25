Template.home.helpers({
  rooms: function() {
    return Rooms.find();
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
    var roomId;

    roomId = Rooms.insert({
      name: "Chat with " + getUserName(this),
      participants: [Meteor.userId(), this._id]
    });

    createChatNotification(roomId, this);

    Router.go('room', {_id: roomId});
  }
});