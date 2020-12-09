const lastYear = (() => {
  const date = new Date();
  date.setDate(date.getDate() - 365);
  return date;
})();

const nextYear = (() => {
  const date = new Date();
  date.setDate(date.getDate() + 365);
  return date;
})();

const keyIdByName = (acc, obj) => {
  acc[obj.name] = obj.id;
  return acc;
};


const PROFESSOR = [
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    name: 'Joslo Fredrickson',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'a95c4a15-4b91-4def-b68e-a59a60855087',
    name: 'Gull Johnson',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for professor delete scenario
  {
    id: 'a95c4a15-4b91-4def-b68e-a59a60855086',
    name: 'Feta Porta',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for professor update scenario
  {
    id: 'a95c4a15-4b91-4def-b68e-a69a60855086',
    name: 'Jermaine Cole',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const PROFESSOR_IDS = PROFESSOR.map((val) => val.id);
const PROFESSOR_IDS_BY_NAME = [...PROFESSOR].reduce(keyIdByName, {});

const COURSE = [
  // Used for test academic deadline
  {
    id: '1cc2a365-ee09-42ab-ab16-b3b760cb2780',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'BIOL3004',
    time_slot: 'Friday at noon',
    capacity: 59,
    status: 'complete',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test academic deadline
  {
    id: '3520f4be-c8eb-4cf9-b8df-038e3ce1aecd',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'BIOL2004',
    time_slot: 'Friday at noon',
    capacity: 59,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '853a3fbb-48fc-450d-bab8-b36cd8b8ee1c',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'BIOL1004',
    time_slot: 'Friday at noon',
    capacity: 59,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test student/prof registration
  {
    id: '63b804de-c0fd-47c2-a391-5d14999c27a1',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'COMP4004',
    time_slot: 'Friday at noon',
    capacity: 59,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test student/prof registration
  {
    id: 'e21cd32c-900a-42fe-bd86-b3f554aeebcc',
    professor_id: null,
    name: 'COMP3004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test capacity 0 registraion
  {
    id: '94939c98-8433-47fb-af07-e6bfa6349d75',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'COMP2004',
    time_slot: 'Friday at noon',
    capacity: 0,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test deliverable submission
  {
    id: '41b037cb-3e6e-429d-880a-0ecdd54f4833',
    professor_id: null,
    name: 'COMP1104',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test prerequisites
  // Used for add professor to course test
  {
    id: '8ea5d497-e0a4-4f7d-9dc4-624f73f30e51',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'JAPA1004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'complete',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test prerequisites
  // Used for add professor to course test
  {
    id: '6050a53e-2b0b-45e6-b581-795ead3837b1',
    professor_id: null,
    name: 'JAPA2004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for professor deliverable tests, and failure paths
  {
    id: 'a11cd32c-900a-42fe-bd86-b3f554aeebcc',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'COMP2406',
    time_slot: 'Tuesday at noon',
    capacity: 108,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test prerequisites
  {
    id: '6680e3b7-7782-461a-a634-9927048f864b',
    professor_id: null,
    name: 'JAPA3004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test prerequisites
  {
    id: '6c31443b-a967-4c92-ad74-061d31dd6529',
    professor_id: null,
    name: 'JAPA4004',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for updateCourse scenario
  {
    id: '6c31443b-a967-4c92-ad74-061d31ed6529',
    professor_id: null,
    name: 'BUSI2503',
    time_slot: 'Friday at noon',
    capacity: 100,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '6c31443b-a967-5c92-ad74-061d31ed6529',
    professor_id: null,
    name: 'BUSI3119',
    time_slot: 'Friday at noon',
    capacity: 100,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test submit deliverable 
  {
    id: '6c01cec4-7247-471c-bf6a-90a5dcf1dc86',
    professor_id: PROFESSOR_IDS_BY_NAME['Joslo Fredrickson'],
    name: 'FREN1000',
    time_slot: 'Friday at noon',
    capacity: 58,
    status: 'inprogress',
    created_at: new Date(),
    updated_at: new Date()
  },
];
const COURSE_IDS = COURSE.map((val) => val.id);
const COURSE_IDS_BY_NAME = [...COURSE].reduce(keyIdByName, {});

const ACADEMIC_DEADLINE = [
  // used for test 'registered: invalid path after deadline'
  {
    id: '7583ccee-266b-4387-8f40-e53d411b4482',
    type: 'registration',
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['BIOL3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7583ccee-266b-4387-8f40-e53d411b4431',
    type: 'withdraw',
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['BIOL3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '622d895e-9e43-474b-9539-05bfb46d5d8b',
    type: 'registration',
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['BIOL2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // used for test 'dropped with W'
  {
    id: '622d895e-9e43-474b-9539-12bfb46d5d8b',
    type: 'withdraw',
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['BIOL2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e95e635-ad49-45e2-b0ef-a80ca273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BIOL1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // used for test 'dropped with DR'
  {
    id: '7e95e635-ad49-45e2-b0ef-a80ca217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BIOL1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e95e635-ad49-45e2-b0ef-a20ca273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e95e635-ad49-45e2-b0ef-b21dc217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25e635-ad49-45e2-b0ef-a20ca273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b95e635-ad49-45e2-b0ef-b21dc217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2e25e635-ad49-45e2-b0ef-b20ca273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b35e635-ad49-45e2-b0ef-b21dc217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25e635-ad49-45e2-b0ef-a21ca273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP1104'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b45e635-ad49-45e2-b0ef-b21dc217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP1104'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25e635-ad49-45e2-b0ef-a20ca273321a',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b15e635-ad49-45e2-b0ef-b21dc217328b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25e635-ad49-45e2-b0ef-a20cb273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b95e635-ad49-45e1-b0ef-b21dc227322b',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25b635-ad49-45e2-b0ef-a20cb273328b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP2406'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b95e635-ad49-45e2-b0ef-b21dc227322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP2406'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '7e25b635-ad49-45e2-b0ef-a20cb273228b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2b95e635-ad49-45e2-b0ef-b21dc213322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1a25b635-ad49-45e2-b0ef-a20cb273228b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1b25e635-ad49-45e2-b0ef-b21dc213322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['JAPA4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1a25b635-ad49-45e2-a2ef-a20cb273338b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BUSI2503'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1b25e635-ad49-45e2-b1bf-a21dc213322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BUSI2503'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1a25b635-ad49-45e2-a2ef-a20cb273228b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BUSI3119'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1b21e635-ad49-45e2-b1bf-a21dc213322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BUSI3119'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1a25b635-ad49-45e2-a2ef-a20cb272128b',
    type: 'registration',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['FREN1000'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1b21e635-ad49-45e2-b1af-a21ab223322c',
    type: 'withdraw',
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['BUSI3119'],
    created_at: new Date(),
    updated_at: new Date()
  },
];
const ACADEMIC_DEADLINE_IDS = ACADEMIC_DEADLINE.map((val) => val.id);

const ADMINISTRATOR = [
  {
    id: 'c5f20a34-66ab-4872-bc7c-2d29693105bd',
    name: 'Jelog Yugislav',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for delete admin test
  {
    id: 'c5f20a34-66ab-4872-bc7c-2d29693105bc',
    name: 'Calvin Cordozar Broadus Jr.',
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for update admin test
  {
    id: 'c5f20a34-66ab-4872-bc7c-1e29693105bd',
    name: 'Andre Romelle Young',
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
    email: 'xelo@gmail.com',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '525db196-4669-4dd2-9212-1cb677b02473',
    name: 'Antwan Andre Patton',
    email: 'antwan@gmail.com',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  }
];
const APPLICATION_IDS = APPLICATION.map((val) => val.id);

const STUDENT = [
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    name: 'Josh Gorman',
    student_number: '101052915',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'df88f9b9-64bb-457c-a888-8efedd1295c3',
    name: 'Eros Di Pede',
    student_number: '101512915',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'df88f9b8-64bb-457c-a888-2efedd1295c3',
    name: 'Wesley Peckinghem',
    student_number: '10103540',
    birth_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'df88f9b9-64bb-457c-a888-2efedd1295c3',
    name: 'Jarold Patinkin',
    student_number: '10103520',
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
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test 'deliverable submission'
  {
    id: 'a011eb9c-2646-4b15-8869-a1c186680aaa',
    name: 'deliverable assignment 1',
    weight: 0.2,
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['COMP1104'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test 'deliverable submission'
  {
    id: '75adfb49-8516-417c-ad8c-d0d9aa1cf781',
    name: 'deliverable assignment 2',
    weight: 0.2,
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['COMP1104'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // used in Update deliverable success test
  {
    id: '75adfb49-8516-417c-ad8c-d0d9aa1cf772',
    name: 'deliverable assignment 4',
    weight: 0.2,
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['COMP2406'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for update deliverable invalid path a
  {
    id: '75adfb49-8516-417c-ad8c-d0d8aa1cf772',
    name: 'deliverable assignment 1',
    weight: 0.2,
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['COMP2406'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for delete deliverable invalid path a
  {
    id: '75adfb49-8516-417d-ad8c-d0d8aa1cf772',
    name: 'deliverable assignment 2',
    weight: 0.2,
    due_date: lastYear,
    course_id: COURSE_IDS_BY_NAME['COMP2406'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '5a2ed1b7-6052-40b0-80ff-86a0f6da2d80',
    name: 'assignment 1: french practice',
    weight: 0.2,
    due_date: nextYear,
    course_id: COURSE_IDS_BY_NAME['FREN1000'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const DELIVERABLE_IDS = DELIVERABLE.map((val) => val.id);
const DELIVERABLE_IDS_BY_NAME = [...DELIVERABLE].reduce(keyIdByName, {});

const ENROLLED = [
  // Used for test 'unregister student'
  {
    id: '2108b4e7-daf1-438f-9ad7-7612ef034bd4',
    grade: 20,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['COMP4004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for test 'deliverable submissions'
  {
    id: '4aa4793f-5bea-493e-896b-8152c648f97d',
    grade: 10,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['COMP1104'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for prerequisite test
  // Used for unRegister test
  {
    id: '173db109-d8f7-4e11-ac5e-f68baa13fbdf',
    grade: 10,
    status: 'complete',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['JAPA1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for prerequisite test
  {
    id: 'd03e49d5-578e-45f5-be61-dacad806ec05',
    grade: 10,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['JAPA3004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for unRegister test
  {
    id: 'eb490735-944a-4f4b-9c1e-37750971371d',
    grade: 10,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['BIOL1004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for unRegister test
  {
    id: '4ea81ab8-c221-40f1-aa7c-7f5699cebe89',
    grade: 10,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['BIOL2004'],
    created_at: new Date(),
    updated_at: new Date()
  },
  // Used for submit deliverable test
  {
    id: 'd634052b-b08a-4b56-92a6-8a71d1f308f7',
    grade: 0,
    status: 'inprogress',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    course_id: COURSE_IDS_BY_NAME['FREN1000'],
    created_at: new Date(),
    updated_at: new Date()
  },
];
const ENROLLED_IDS = ENROLLED.map((val) => val.id);

const PREREQUISITE = [
  {
    id: 'd59e0654-3cdb-4d68-b8ac-a3a370c773a4',
    course_id: COURSE_IDS_BY_NAME['JAPA4004'],
    prerequisite_course_id: COURSE_IDS_BY_NAME['JAPA3004'],
    prerequisite_course_name: 'JAPA3004',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '25de889b-0c4d-4e68-82a3-652f0f38fa3c',
    course_id: COURSE_IDS_BY_NAME['JAPA2004'],
    prerequisite_course_id: COURSE_IDS_BY_NAME['JAPA1004'],
    prerequisite_course_name: 'JAPA1004',
    created_at: new Date(),
    updated_at: new Date()
  }
];
const PREREQUISITE_IDS = PREREQUISITE.map((val) => val.id);

const SUBMITS = [
  {
    id: '5e9fb958-9881-4895-8033-1467d15b116a',
    grade: 50,
    submission: 'Hello my name is Jeremy',
    deliverable_id: DELIVERABLE_IDS_BY_NAME['assignment 2'],
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'b1551947-21cb-4142-a0c5-6a97de62d52e',
    grade: 50,
    submission: 'This is my french assignment',
    deliverable_id: DELIVERABLE_IDS_BY_NAME['assignment 1: french practice'],
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    created_at: new Date(),
    updated_at: new Date()
  }
];
const SUBMITS_IDS = SUBMITS.map((val) => val.id);

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
    id: '72cdcfd0-969a-4949-affe-dc999a07618e',
    user_role: 'professor',
    email: 'gull@gmail.com',
    professor_id: PROFESSOR_IDS_BY_NAME['Gull Johnson'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '42cdcfd0-969a-4949-affe-dc999a07618e',
    user_role: 'professor',
    email: 'coleworld@gmail.com',
    professor_id: PROFESSOR_IDS_BY_NAME['Jermaine Cole'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '45cdcfd0-969a-4949-affe-dc999a07618e',
    user_role: 'professor',
    email: 'feta@gmail.com',
    professor_id: PROFESSOR_IDS_BY_NAME['Feta Porta'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '81cdcfd0-969a-4949-affa-dc999a07617b',
    user_role: 'administrator',
    email: 'jelog@gmail.com',
    administrator_id: ADMINISTRATOR_IDS_BY_NAME['Jelog Yugislav'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '81cdcfd0-969a-4949-affd-dc999a07617b',
    user_role: 'administrator',
    email: 'calvin@gmail.com',
    administrator_id: ADMINISTRATOR_IDS_BY_NAME['Calvin Cordozar Broadus Jr.'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '81cdcfd0-969a-4949-affe-dc999a07617b',
    user_role: 'administrator',
    email: 'andre@gmail.com',
    administrator_id: ADMINISTRATOR_IDS_BY_NAME['Andre Romelle Young'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '9e3978ca-9921-45d1-8171-78db4090e0b6',
    user_role: 'student',
    email: 'josh@gmail.com',
    student_id: STUDENT_IDS_BY_NAME['Josh Gorman'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '1e4638ca-9921-45d1-8171-78db4090e0b6',
    user_role: 'student',
    email: 'eros@gmail.com',
    student_id: STUDENT_IDS_BY_NAME['Eros Di Pede'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '9e3978ca-9921-45d1-8171-78db4090e0c1',
    user_role: 'student',
    email: 'wesley@gmail.com',
    student_id: STUDENT_IDS_BY_NAME['Wesley Peckinghem'],
    //password = "supersecret"
    password: '$2a$10$0VIYauqooW157HRpbVP31.X8V3bN.AAgPgvquxsl7l.ggBbs5hcQW',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '9e3218ca-9921-45d1-8171-78db4090e0b6',
    user_role: 'student',
    email: 'jarold@gmail.com',
    student_id: STUDENT_IDS_BY_NAME['Jarold Patinkin'],
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
  LOGIN_CREDENTIAL,
  LOGIN_CREDENTIAL_IDS
};