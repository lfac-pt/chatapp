Template.room.helpers({
  roomName : function () {
    if (this.room.isPrivate) {
      return getPrivateRoomName(this.room);
    }
    return this.room.name;
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