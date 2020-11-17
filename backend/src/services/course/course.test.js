const app = require('app');

describe('"course" service', () => {
  it('registered the service', () => {
    const service = app.service('course');
    expect(service).toBeTruthy();
  });
});