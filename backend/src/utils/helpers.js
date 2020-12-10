const createUserCredential = (context, role, email) => {
  const password = Math.random().toString(36).slice(2);
  const data = {
    user_role: role,
    email: email,
    password: 'supersecret',
  };
  data[`${role}Id`] = context.result.id;
  context.app.service('loginCredential').create(data).then(result=>{
    return result;
  }).catch((e)=>{
    return null;
  });
};

const updateUserEmail = (context, role, email) => {
  const query = {
    user_role: role,
  };
  query[`${role}Id`] = context.result.id;
  context.app.service('loginCredential').find({query}).then((creds)=>{
    context.app.service('loginCredential').patch(creds[0].id,{email}).then(result=>{
      return result;
    }).catch(()=>{
      return null;
    });
  }).catch((e) => {
    return null;
  });
};

const checkObjectContains = (obj1, obj2) => {
  for (const key of Object.keys(obj2)) {  
    const date = key == 'birth_date' || key == 'due_date';
    let val1 = (date && typeof obj1[key] == 'string') ? new Date(obj1[key]) : obj1[key];
    let val2 = (date && typeof obj2[key] == 'string') ? new Date(obj2[key]) : obj2[key];
    let comparison;
    if (date) {
      comparison = val1.getTime() !== val2.getTime();
    } else comparison = val1 !== val2;
    if (!(key in obj1) || comparison) {
      return false;
    }
  }
  return true;
};

module.exports = {
  updateUserEmail,
  createUserCredential,
  checkObjectContains
};