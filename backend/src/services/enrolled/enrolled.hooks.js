// const {authenticate} = require("@feathersjs/authentication").hooks;
const errors = require('@feathersjs/errors');

const validateSubmission = () => async (context) => {
  // Test for the sutdent registering with space in the course
  const courseR = await context.app.service('course').get(context.data.courseId);
  let enrolledR = await context.app.service('enrolled').find({
    query: {
      courseId: context.data.courseId
    }
  });
  enrolledR = enrolledR.filter((val) => val.status === 'inprogress');

  if (enrolledR.length+1 > courseR.capacity) {
    throw new errors.GeneralError('Failure, class already full!');
  }

  // Test for the sutdent having the required prerequisites
  const enrolled = await context.app.service('enrolled').find({
    query: {
      studentId: context.data.studentId
    }
  });
  const prereq= await context.app.service('prerequisite').find(
    {
      query:
      {
        courseId: context.data.courseId
      }
    }
  );
  let test;
  prereq.forEach((p) => {
    test = false;
    if (enrolled.some(e => e.courseId === p.prerequisite_course_id && e.status === 'complete')) {
      test = true;
    }
    if (test === false) throw new errors.GeneralError('Failure, prerequisite not completed!');
  });

  // Test for the sutdent Registering within the dealdines 
  const response = await context.app.service('academicDeadline').find(
    {
      query:
      {
        courseId: context.data.courseId
      }
    }
  );
  response.forEach((deadline) => {
    if (deadline.type === 'registration') {
      if (new Date() > new Date(deadline.due_date)) {
        throw new errors.GeneralError('Failure, past registration date!');
      }
    }
  });

  return context;
};

const validateRemoval = () => async (context) => {
  const res = await context.app.service('enrolled').find(
    {
      query:
        context.params.query
    }
  );
  if (res[0].status === 'dropped with DR' || res[0].status === 'dropped with W') {
    throw new errors.GeneralError('Failure, course already dropped!');
  } else if (res[0].status === 'complete') {
    throw new errors.GeneralError('Failure, course already complete!');
  }

  const response = await context.app.service('academicDeadline').find(
    {
      query:
      {
        courseId: context.params.query.courseId
      }
    }
  );

  response.forEach((deadline) => {
    if (deadline.type === 'withdraw') {
      if (new Date() < new Date(deadline.due_date)) {
        context.result = { message:'Success, dropped with DR!' };
        context.app.service('enrolled').patch(null, {
          status: 'dropped with DR',
        }, {
          query: 
            context.params.query
        });
      } else {
        context.result = { message:'Success, dropped with W!' };
        context.app.service('enrolled').patch(null, {
          status: 'dropped with W'
        }, {
          query: 
            context.params.query
        });
      }
    }
  });
};

const validateGradeSubmit= () => async (context) => {
  if (context.data.grade && !context.data.grade.match('^[1-9][0-9]?$|^100$')) {
    throw new errors.GeneralError('Failure, grade must be between 0-100!');
  }

  return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSubmission()],
    update: [],
    patch: [validateGradeSubmit()],
    remove: [validateRemoval()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};