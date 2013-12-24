Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [/*Meteor.subscribe('notifications')*/];
  }
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });

});