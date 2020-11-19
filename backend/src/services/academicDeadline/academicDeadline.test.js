const app = require('app');

describe('"academicDeadline" service', () => {
  it('registered the service', async () => {
    const service = app.service('academicDeadline');
    expect(service).toBeTruthy();

    console.log(app);
    const g = await app.service('student').find({
      name: 'james'
    });
  });
});