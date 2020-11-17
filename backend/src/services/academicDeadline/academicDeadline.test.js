const app = require('app');

describe('"academicDeadlines" service', () => {
  it('registered the service', () => {
    const service = app.service('academicDeadlines');
    expect(service).toBeTruthy();
  });
});