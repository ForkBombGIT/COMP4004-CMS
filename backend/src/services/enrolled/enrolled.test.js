const app = require('app');
const { paramsForServer } = require('feathers-hooks-common');

describe('"enrolled" service', () => {
  it('registered the service', () => {
    const service = app.service('enrolled');
    expect(service).toBeTruthy();
  });

  it('creates and deletes an enrolled role', async () => {
    const enrolledService = app.service('enrolled');
    const studentService = app.service('student');
    const courseService = app.service('course');
    const date = new Date();
    const deadlines = {
      courseRegistrationDate: date,
      courseWithdrawDate: date,
    };
    const course = {
      name: 'TEST_COURSE',
      capacity: 10,
      status: 'inprogress',
    };
    const student = {
      name: 'TEST_NAME',
      birth_date: '2020-01-01',
    };
    const email = 'test@gmail.com';


    const c = await courseService.create(course,paramsForServer({
      data: deadlines
    }));
    const s = await studentService.create(student, paramsForServer({
      data:{
        email
      }
    }));
    const e = await enrolledService.create({ studentId: s.id, courseId: c.id, status: 'inprogress' });
    await courseService.remove(c.id);
    await studentService.remove(s.id);
    await enrolledService.remove(e.id);
  });
});