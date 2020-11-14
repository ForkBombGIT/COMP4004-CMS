const app = require('app');

describe('"student" service', () => {
  it('registered the service', () => {
    const service = app.service('student');
    expect(service).toBeTruthy();
  });
});