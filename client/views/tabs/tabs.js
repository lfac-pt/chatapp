Template.tabs.helpers({
  rooms : function () {
    var rooms;

    rooms = Session.get('currentRooms') || [];

    rooms = rooms.map(function (room) {
      var isHighlighted;

      room.activeClass = room.isActive ? 'active' : '';

      if (room.isPrivate) {
        room.name = getPrivateRoomName(room);
      }

      //IF the current room is not active, see if need to highlight it
      if (!room.isActive &&
          Notifications.findOne({roomId: room._id, read: false})) {
        room.highlightClass = "ca-highlight";
      }

      return room;
    });

    return rooms;
  }
});