exports.getMax = (object) => {
  return Object.keys(object).filter((x) => {
    return object[x] == Math.max.apply(null, Object.values(object));
  });
};
