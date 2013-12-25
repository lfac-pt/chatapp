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