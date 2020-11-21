module.exports = {
  async sessions(parent, args, { sessionsLoader }, info) {
    info.cacheControl.setCacheHint({ maxAge: 600, scope: "PUBLIC" });
    const speakerId = parent.id;
    return sessionsLoader.load(speakerId);
  },
};
