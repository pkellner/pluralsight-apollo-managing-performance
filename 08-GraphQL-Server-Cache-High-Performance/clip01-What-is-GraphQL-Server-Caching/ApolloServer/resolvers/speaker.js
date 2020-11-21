module.exports = {
  async sessions(parent, args, { sessionsLoader }, info) {
    const speakerId = parent.id;
    return sessionsLoader.load(speakerId);
  },
};
