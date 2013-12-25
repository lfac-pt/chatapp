// Fixture data
if (Rooms.find().count() === 0) {
  Rooms.insert({
    name: "Public",
    participants: []
  });
}