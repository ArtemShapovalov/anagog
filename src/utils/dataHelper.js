function getRandRange(from, to, fixed) {
  Math.random() /*?*/
  return +(Math.random() * (to - from) + from).toFixed(fixed);
}

function getRandArray(array) {
  return array[getRandRange(0, array.length-1, 0)];
}

function getRandLongitude() {
  return getRandRange(-180, 180, 6);
}

function getRandLatitude() {
  return getRandRange(-90, 90, 6);
}

function getPoiId() {
  return getRandRange(0, Number.MAX_SAFE_INTEGER, 0);
}

function getAlgorithmType() {
  const algorithmTypes = Array.from(Array(7), (_, k) => k + 1);
  return getRandArray(algorithmTypes)
}

function getActivityType() {
  const activityTypes = Array.from(Array(6), (_, k) => Math.pow(2, k));
  return getRandArray(activityTypes);
}

module.exports = {
  getPoiId,
  getAlgorithmType,
  getActivityType,
  getRandLongitude,
  getRandLatitude
};
