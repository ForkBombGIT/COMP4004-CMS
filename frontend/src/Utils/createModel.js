export const createModel = (
  model,
  name,
  birth = undefined,
  cap = undefined,
  time = undefined,
  status = undefined,
  due = undefined,
  weight = undefined,
  relatedModelId = undefined
) => {
  const createdModel = {};
  createdModel.name = name === undefined || name === "" ? null : name;
  if (model === "student") {
    createdModel.birth_date =
      birth === undefined || birth === "" ? null : birth;
  } else if (model === "course") {
    createdModel.capacity = cap;
    createdModel.time_slot = time;
    createdModel.status = status;
  } else if (model === "deliverable") {
    createdModel.weight = weight;
    createdModel.due_date = due;
    createdModel.courseId = relatedModelId;
  }
  return createdModel;
};

export default createModel;
