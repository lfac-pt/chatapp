Template.home.helpers({
  rooms: function(/* route names */) {
    var publicRooms, privateRooms;

    //TODO: move this to a collection in the server
    publicRooms = [{
      name: "Public",
      _id: "0000",
      isPublic: true,
      participants: []
    }];

    privateRooms = Meteor.users
      .find()
      .fetch()
      .filter(function (user) {
        return user._id !== Meteor.userId();
      })
      .map(function (user) {
        return {
          name: "Chat with " + _.first(user.emails).address,
          _id: user._id,
          isPublic: false,
          participants: [Meteor.userId(), user._id]
        };
      });

    return _.union(publicRooms, privateRooms);
  }
});