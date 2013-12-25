Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('usersData'), Meteor.subscribe('rooms')];
  }
});

Router.map(function() {
  this.route('home', {
    path: '/'
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
      return [Meteor.subscribe('roomMessages', this.params._id)];
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