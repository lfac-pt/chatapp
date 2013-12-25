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

Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn : function () {
      return [Meteor.subscribe('rooms')];
    }
  });

  this.route('room', {
    path: '/room/:_id',
    data: function() {
      return {
        room: Rooms.findOne(this.params._id),
        messages: Messages.find({roomId: this.params._id})
      };
    },
    waitOn : function () {
      return [
        Meteor.subscribe('singleRoom', this.params._id),
        Meteor.subscribe('roomMessages', this.params._id)
      ];
    }
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