Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument,
  insert: function () {return true;}
});

createChatNotification = function(roomId, toUser) {
  Notifications.insert({
    type: "chat",
    userName: getUserName(Meteor.user()),
    roomId: roomId,
    read: false,
    userId: toUser._id
  });
};

Meteor.methods({
  markRoomNotificationsAsRead : function (roomId) {
    Notifications.update({roomId: roomId, userId: Meteor.userId(), read: false},
      {$set: {read: true}}, {multi: true});
  }
});