module.exports = {
  async room(parent, args, { roomLoader }, info) {
    const roomId = parent.roomId;
    return roomLoader.load(roomId);
  },
};