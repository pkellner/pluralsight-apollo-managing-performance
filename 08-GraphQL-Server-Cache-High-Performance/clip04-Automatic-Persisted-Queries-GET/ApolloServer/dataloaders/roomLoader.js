const axios = require("axios");
const DataLoader = require("dataloader");

module.exports = {
  getRoomLoader: () =>
    new DataLoader(async (roomIds) => {
      const responseRooms = await axios.get("http://localhost:5000/rooms");

      const roomMap = {};
      responseRooms.data.forEach((room) => {
        roomMap[room.id] = room;
      });

      return roomIds.map((roomId) => {
        return roomMap[roomId];
      });
    }),
};
