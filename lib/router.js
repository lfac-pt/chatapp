Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('usersData')];
  }
});

Router.map(function() {
  this.route('home', {
    path: '/'
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