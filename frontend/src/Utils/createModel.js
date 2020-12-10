export const createModel = (model) => {
  const createdModel = {};
  createdModel.name =
    model.name === undefined || model.name === "" ? null : model.name;
  if (model.service === "student") {
    createdModel.birth_date =
      model.birth === undefined || model.birth === "" ? null : model.birth;
  } else if (model.service === "course") {
    createdModel.capacity = model.cap;
    createdModel.time_slot = model.time;
    createdModel.status = model.status;
  } else if (model.service === "deliverable") {
    createdModel.weight = model.weight;
    createdModel.due_date = model.due;
    createdModel.courseId = model.relatedModelId;
  } else if (model.service === "prerequisite") {
    console.log(model.prerequisite_course_id);
    createdModel.prerequisite_course_id = model.prerequisite_course_id;
    createdModel.courseId = model.relatedModelId;
  }
  return createdModel;
};

export default createModel;
