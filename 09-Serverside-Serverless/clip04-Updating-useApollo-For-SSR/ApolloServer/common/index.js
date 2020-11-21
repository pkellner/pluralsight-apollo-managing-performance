function getCursor(rec) {
  return Buffer.from(rec.toString()).toString("base64");
}
function getOffsetCustom(data, afterCursor) {
  const offsetBasedOnFind = data.findIndex(
    (rec) => getCursor(rec.id) === afterCursor
  );
  return offsetBasedOnFind === -1 ? 0 : offsetBasedOnFind + 1;
}
Object.assign(exports, {
  getCursor,
  getOffsetCustom,
});
