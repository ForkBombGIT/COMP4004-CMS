const app = require('app');

describe('"enrolled" service', () => {
  it('registered the service', () => {
    const service = app.service('enrolled');
    expect(service).toBeTruthy();
  });

  it('creates and deletes an enrolled role', async () => {
    const enrolledService = app.service('enrolled');
    const studentService = app.service('student');
    const courseSservice = app.service('course');

    const course = {
      name: 'TEST_COURSE'
    };
    const student = {
      name: 'TEST_NAME'
    };

    const c = await courseSservice.create(course);
    const s = await studentService.create(student);
    const e = await enrolledService.create({ studentId: s.id, courseId: c.id });

    await courseSservice.remove(c.id);
    await studentService.remove(s.id);
    await enrolledService.remove(e.id);
  });
});