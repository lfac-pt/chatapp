Meteor.publish("usersData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1}});
});