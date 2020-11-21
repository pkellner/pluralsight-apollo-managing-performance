const axios = require("axios");

module.exports = {
  async toggleSpeakerFavorite(parent, args, context, info) {
    const response = await axios.get(
      `http://localhost:5000/speakers/${args.speakerId}`
    );
    const toggledData = {
      ...response.data,
      favorite: !response.data.favorite,
    };
    await axios.put(
      `http://localhost:5000/speakers/${args.speakerId}`,
      toggledData
    );
    return toggledData;
  },
  async addSpeaker(parent, args, context, info) {
    const { first, last, favorite } = args.speaker;
    const response = await axios.get("http://localhost:5000/speakers");
    const foundRec = response.data.find(
      (a) => a.first === first && a.last === last
    );
    if (foundRec) {
      throw new UserInputError("first and last already exist", {
        invalidArgs: Object.keys(args),
      });
    }
    const resp = await axios.post("http://localhost:5000/speakers", {
      first,
      last,
      favorite,
    });
    return resp.data;
  },
  async deleteSpeaker(parent, args, context, info) {
    const url = `http://localhost:5000/speakers/${args.speakerId}`;
    const foundRec = await axios.get(url);
    await axios.delete(url);
    return foundRec.data;
  },
};
