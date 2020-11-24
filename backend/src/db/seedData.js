const keyIdByName = (acc, obj) => {
  acc[obj.name] = obj.id;
  return acc;
};

const COURSE = [
  {
    id: '63b804de-c0fd-47c2-a391-5d14999c27a1',
    name: 'COMP4004',
    time_slot: 'Friday at noon',
    capacity: 59,
    status: 'cancelled',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'e21cd32c-900a-42fe-bd86-b3f554aeebcc',
    name: 'COMP3004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'running',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const COURSE_IDS = COURSE.map((val) => val.id);
const COURSE_IDS_BY_NAME = [...COURSE].reduce(keyIdByName, {});

const ACADEMIC_DEADLINE = [
  {
    id: '7583ccee-266b-4387-8f40-e53d411b4482',
    type: 'Registration',
    due_date: new Date(),
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const ACADEMIC_DEADLINE_IDS = ACADEMIC_DEADLINE.map((val) => val.id);

const ADMINISTRATOR = [
  {
    id: 'c5f20a34-66ab-4872-bc7c-2d29693105bd',
    name: 'Jelog Yugislav',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const ADMINISTRATOR_IDS = ADMINISTRATOR.map((val) => val.id);
const ADMINISTRATOR_IDS_BY_NAME = [...ADMINISTRATOR].reduce(keyIdByName, {});

const APPLICATION = [
  {
    id: '715db196-4669-4dd2-9212-1cb677b02473',
    name: 'Xelostrad kulio',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const APPLICATION_IDS = APPLICATION.map((val) => val.id);

const PROFESSOR = [
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    name: 'Joslo Fredrickson',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const PROFESSOR_IDS = PROFESSOR.map((val) => val.id);
const PROFESSOR_IDS_BY_NAME = [...PROFESSOR].reduce(keyIdByName, {});

const STUDENT = [
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    name: 'Josh Gorman',
    student_number: '101052915',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  }
];
const STUDENT_IDS = STUDENT.map((val) => val.id);
const STUDENT_IDS_BY_NAME = [...STUDENT].reduce(keyIdByName, {});

const DELIVERABLE = [
  {
    id: '520471c9-d12d-4582-9491-098011100558',
    name: 'assignment 2',
    weight: 0.2,
    due_date: new Date(),
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const DELIVERABLE_IDS = DELIVERABLE.map((val) => val.id);
const DELIVERABLE_IDS_BY_NAME = [...DELIVERABLE].reduce(keyIdByName, {});

const ENROLLED = [
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    grade: 20,
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const ENROLLED_IDS = ENROLLED.map((val) => val.id);

const PREREQUISITE = [
  {
    id: 'd59e0654-3cdb-4d68-b8ac-a3a370c773a4',
    prerequisite_course_id: COURSE_IDS_BY_NAME['COMP3004'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const PREREQUISITE_IDS = PREREQUISITE.map((val) => val.id);

const SUBMITS = [
  {
    id: '5e9fb958-9881-4895-8033-1467d15b116a',
    grade: 50,
    deliverable_id: DELIVERABLE_IDS_BY_NAME['assignment 2'],
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const SUBMITS_IDS = SUBMITS.map((val) => val.id);

const TEACHES = [
  {
    id: '5e9fb958-9881-4895-8033-1467d15b116a',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const TEACHES_IDS = TEACHES.map((val) => val.id);

const LOGIN_CREDENTIAL = [
  {
    id: '81cdcfd0-969a-4949-affe-dc999a07618e',
    user_role: 'professor',
    email: 'joslo@gmail.com',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '81cdcfd0-969a-4949-affe-dc999a07617b',
    user_role: 'administrator',
    email: 'jelog@gmail.com',
    administrator_id: ADMINISTRATOR_IDS_BY_NAME['Jelog Yugislav'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const LOGIN_CREDENTIAL_IDS = LOGIN_CREDENTIAL.map((val) => val.id);

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
  PREREQUISITE,
  PREREQUISITE_IDS,
  PROFESSOR,
  PROFESSOR_IDS,
  STUDENT,
  STUDENT_IDS,
  SUBMITS,
  SUBMITS_IDS,
  TEACHES,
  TEACHES_IDS,
  LOGIN_CREDENTIAL,
  LOGIN_CREDENTIAL_IDS
};