const axios = require("axios");
const DataLoader = require("dataloader");

    module.exports = {
      getSessionsLoader: () =>
        new DataLoader(async (speakerIds) => {
          const responseSessions = await axios.get(
            "http://localhost:5000/sessions"
          );
      const responseSessionSpeakers = await axios.get(
        "http://localhost:5000/sessionSpeakers"
      );

      const sessionIds = responseSessionSpeakers.data
        .filter((rec) => {
          return speakerIds.includes(rec.speakerId);
        })
        .map((rec) => {
          return rec.sessionId;
        });

      const sessionsResult = responseSessions.data.filter((rec) => {
        return sessionIds.includes(rec.id);
      });

      let sessionsForSpeakerMap = {};
      speakerIds.forEach((speakerId) => {
        const sessionIdsForSpeaker = responseSessionSpeakers.data
          .filter((sessionSpeakerRec) => {
            return sessionSpeakerRec.speakerId === speakerId;
          })
          .map((sessionSpeakerRec) => {
            return sessionSpeakerRec.sessionId;
          });

        const sessionsForSpeaker = sessionsResult.filter((session) => {
          return sessionIdsForSpeaker.includes(session.id);
        });

        sessionsForSpeakerMap[speakerId] = sessionsForSpeaker;
      });

      return speakerIds.map((speakerId) => {
        return sessionsForSpeakerMap[speakerId];
      });
    }),
};
