const checkObjectContains = (obj1, obj2) => {
  for (const key of Object.keys(obj1)) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  checkObjectContains
};