Template.room.events({
  'submit form': function(e) {
    e.preventDefault();

    var message, input;

    input = $(e.target).find('[name=text]');
    message = {
      text: input.val(),
      timestamp: Date.now(),
      sender : {
        userId: Meteor.userId(),
        userName: getUserName(Meteor.user())
      },
      roomId: this.room._id
    };

    Messages.insert(message);

    input.val("");
  }
});