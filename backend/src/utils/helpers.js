const checkObjectContains = (obj1, obj2) => {
  for (const key of Object.keys(obj2)) {  
    let val1 = (key == 'birth_date' && typeof obj1[key] == 'string') ? new Date(obj1[key]) : obj1[key];
    let val2 = (key == 'birth_date' && typeof obj2[key] == 'string') ? new Date(obj2[key]) : obj2[key];
    let comparison;
    if (key == 'birth_date') {
      comparison = val1.getTime() !== val2.getTime();
    } else comparison = val1 !== val2;
    if (!(key in obj1) || comparison) {
      return false;
    }
  }
  return true;
};

module.exports = {
  checkObjectContains
};