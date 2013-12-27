Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument,
  insert: function () {return true;}
});

Meteor.methods({
  createNotification : function (roomId, toUserId) {
    var notification;

    notification = Notifications.findOne({
      type: "chat",
      roomId: roomId,
      senderUserId: Meteor.userId(),
      userId: toUserId
    });

    if (notification) {
      Notifications.update(notification._id, {$set: {
        timestamp: Date.now(),
        read: false
      }});
    } else {
      Notifications.insert({
        type: "chat",
        senderUserId: Meteor.userId(),
        senderUserName: getUserName(Meteor.user()),
        roomId: roomId,
        read: false,
        userId: toUserId,
        timestamp: Date.now()
      });
    }
  },
  markRoomNotificationsAsRead : function (roomId) {
    Notifications.update({roomId: roomId, userId: Meteor.userId(), read: false},
      {$set: {read: true}}, {multi: true});
  }
});