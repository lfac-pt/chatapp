Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('usersData'),
      Meteor.subscribe('notifications')
    ];
  }
});

RoomController = RouteController.extend({
  DEFAULT_MESSAGES_LIMIT: 30,
  INCREMENT: 20,
  limit: function() {
    return parseInt(this.params.messagesLimit, 10) ||
      this.DEFAULT_MESSAGES_LIMIT;
  },
  addRoomToCurrent : function () {
    var currentRooms, currentRoom;

    currentRoom = Rooms.findOne(this.params._id);

    currentRooms = Session.get("currentRooms") || [];
    currentRooms = _.reject(currentRooms, function (room) {
      return room._id === currentRoom._id;
    });
    currentRooms = currentRooms.map(function (room) {
      room.isActive = false;
      return room;
    });

    currentRoom.isActive = true;

    currentRooms.unshift(currentRoom);

    //Make sure there are no more than 5 current rooms
    currentRooms = currentRooms.slice(0, 5);


    Session.set("currentRooms", currentRooms);
  },
  data: function() {
    return {
      moreMessagesPath: this.route.path({
        _id: this.params._id,
        messagesLimit: this.limit() + this.INCREMENT
      }),
      room: Rooms.findOne(this.params._id),
      messages: Messages.find({roomId: this.params._id},
                              {limit: this.limit(), sort: {timestamp: 1}})
    };
  },
  action : function () {
    //This could not be put on `load` because it runs before `waitOn`
    //is finished
    this.addRoomToCurrent();

    this.render();
  },
  waitOn : function () {
    return [
      Meteor.subscribe('singleRoom', this.params._id),
      Meteor.subscribe('roomMessages', this.params._id, this.limit())
    ];
  },
  after : function () {
    if (Notifications.findOne({roomId: this.params._id, userId: Meteor.userId(), read: false})) {
      Meteor.call('markRoomNotificationsAsRead', this.params._id);
    }
  },
  unload : function () {
    var currentRooms;

    currentRooms = Session.get("currentRooms") || [];

    currentRooms = currentRooms.map(function (room) {
      room.isActive = false;
      return room;
    });

    Session.set("currentRooms", currentRooms);
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn : function () {
      return [Meteor.subscribe('rooms')];
    }
  });

  this.route('room', {
    path: '/room/:_id/:messagesLimit?',
    controller: RoomController
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('accessDenied');
    }
    this.stop();
  }
};
Router.before(requireLogin);