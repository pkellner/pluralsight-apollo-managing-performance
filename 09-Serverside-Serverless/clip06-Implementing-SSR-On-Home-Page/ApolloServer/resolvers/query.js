const axios = require("axios");
const { getOffsetCustom, getCursor } = require("../common");

module.exports = {
  async speakers(parent, args, context, info) {
    const response = await axios.get("http://localhost:5000/speakers");
    const { offset, limit } = args;
    return {
      datalist: response.data.filter((rec, index) => {
        return index > offset - 1 && (offset + limit > index || limit == -1);
      }),
      pageInfo: {
        totalItemCount: response.data.length,
      },
    };
  },
  speakersConcat: async function (parent, args, context, info) {
    const response = await axios.get("http://localhost:5000/speakers");
    const data = response.data.sort((a, b) => {
      return a.last.localeCompare(b.last);
    });
    const { limit, afterCursor } = args;
    const offset = getOffsetCustom(data, afterCursor);
    const datalist = data
      .filter((rec, index) => {
        return index > offset - 1 && (offset + limit > index || limit == -1);
      })
      .map((rec) => {
        rec.cursor = getCursor(rec.id);
        return rec;
      });
    const pageInfo = {
      totalItemCount: data.length,
      lastCursor:
        datalist.length > 0 ? getCursor(datalist[datalist.length - 1].id) : "",
      hasNextPage: offset + datalist.length < data.length,
    };

    return {
      datalist,
      pageInfo,
    };
  },
  async sessionsConcat(parent, args, context, info) {
    const response = await axios.get("http://localhost:5000/sessions");
    const data = response.data.sort((a, b) => {
      return a.eventYear.localeCompare(b.eventYear);
    });
    const { limit, afterCursor } = args;
    const offset = getOffsetCustom(data, afterCursor);
    const datalist = data
      .filter((rec, index) => {
        return index > offset - 1 && (offset + limit > index || limit == -1);
      })
      .map((rec) => {
        rec.cursor = getCursor(rec.id);
        return rec;
      });
    const pageInfo = {
      totalItemCount: data.length,
      lastCursor:
        datalist.length > 0 ? getCursor(datalist[datalist.length - 1].id) : "",
      hasNextPage: offset + datalist.length < data.length,
    };

    return {
      datalist,
      pageInfo,
    };
  },
};
