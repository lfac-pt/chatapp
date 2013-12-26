Template.tabs.helpers({
  rooms : function () {
    var rooms;

    rooms = Session.get('currentRooms') || [];

    rooms = rooms.map(function (room) {
      room.activeClass = room.isActive ? 'active' : '';

      if (room.isPrivate) {
        room.name = getPrivateRoomName(room);
      }

      return room;
    });

    return rooms;
  }
});