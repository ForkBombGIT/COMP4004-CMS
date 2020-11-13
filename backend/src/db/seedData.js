// const keyIdByName = (acc, obj) => {
//   acc[obj.name] = obj.id;
//   return acc;
// };

const ACADEMIC_DEADLINE = [];
const ACADEMIC_DEADLINE_IDS = ACADEMIC_DEADLINE.map((val) => val.id);

const ADMINISTRATOR = [];
const ADMINISTRATOR_IDS = ADMINISTRATOR.map((val) => val.id);

const APPLICATION = [];
const APPLICATION_IDS = APPLICATION.map((val) => val.id);

const COURSE = [];
const COURSE_IDS = COURSE.map((val) => val.id);

const DELIVERABLE = [];
const DELIVERABLE_IDS = DELIVERABLE.map((val) => val.id);

const ENROLLED = [];
const ENROLLED_IDS = ENROLLED.map((val) => val.id);

const PREREQUISITES = [];
const PREREQUISITES_IDS = PREREQUISITES.map((val) => val.id);

const PROFESSOR = [];
const PROFESSOR_IDS = PROFESSOR.map((val) => val.id);

const STUDENT = [];
const STUDENT_IDS = STUDENT.map((val) => val.id);

const SUBMITS = [];
const SUBMITS_IDS = SUBMITS.map((val) => val.id);

const TEACHES = [];
const TEACHES_IDS = TEACHES.map((val) => val.id);

module.exports = {
  ACADEMIC_DEADLINE,
  ACADEMIC_DEADLINE_IDS,
  ADMINISTRATOR,
  ADMINISTRATOR_IDS,
  APPLICATION,
  APPLICATION_IDS,
  COURSE,
  COURSE_IDS,
  DELIVERABLE,
  DELIVERABLE_IDS,
  ENROLLED,
  ENROLLED_IDS,
  PREREQUISITES,
  PREREQUISITES_IDS,
  PROFESSOR,
  PROFESSOR_IDS,
  STUDENT,
  STUDENT_IDS,
  SUBMITS,
  SUBMITS_IDS,
  TEACHES,
  TEACHES_IDS
};