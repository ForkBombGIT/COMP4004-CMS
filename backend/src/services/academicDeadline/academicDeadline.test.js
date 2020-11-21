const app = require('app');

describe('"academicDeadline" service', () => {
  it('registered the service', async () => {
    const service = app.service('academicDeadline');
    expect(service).toBeTruthy();
  });
});