// Fixture data
if (Rooms.find().count() === 0) {
  Rooms.insert({
    name: "Public",
    participants: [] //TODO when a user is created add it to this list
  });
}