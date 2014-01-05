Template.room.helpers({
  isNotMine : function () {
    return this.sender.userId !== Meteor.userId();
  },
  blockquoteClass : function () {
    return this.sender.userId === Meteor.userId() ? "pull-right" : "";
  },
  groupedMessages : function () {
    var groupedMessages, lastMessage;

    groupedMessages = [];
    lastMessage = null;

    this.messages.rewind();
    this.messages.forEach(function (message) {
      message.timestampAsTimeAgo = moment(message.timestamp).fromNow();

      if (_.isObject(lastMessage) && lastMessage.sender.userId === message.sender.userId &&
            lastMessage.timestampAsTimeAgo === message.timestampAsTimeAgo) {
        lastMessage.lines.push(message.text);
      } else {
        message.lines = [message.text];
        lastMessage = message;
        groupedMessages.push(lastMessage);
      }
    });

    return groupedMessages;
  },
  userColor : function () {
    return stringColorHash(this.sender.userId);
  }
});

Template.room.rendered = function () {
  var mostRecentMessage;

  this.find("input[name=text]").focus();

  mostRecentMessage = this.find(".ca-room-message:last-child");

  if (mostRecentMessage) {
    mostRecentMessage.scrollIntoView();
  }
};

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