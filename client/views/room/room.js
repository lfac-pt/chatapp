Template.room.helpers({
  isNotMine : function () {
    return this.sender.userId !== Meteor.userId();
  },
  blockquoteClass : function () {
    return this.sender.userId === Meteor.userId() ? "pull-right" : "";
  }
});

Template.room.events({
  'submit form': function(e) {
    e.preventDefault();

    var input;

    input = $(e.target).find('[name=text]');

    Meteor.call("postMessage", input.val(), this.room._id, function (error) {
      if (error){
        console.error(error.reason);
      } else {
        input.val("");
      }
    });
  }
});