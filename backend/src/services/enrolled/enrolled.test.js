const app = require('app');

describe('"enrolled" service', () => {
  it('registered the service', () => {
    const service = app.service('enrolled');
    expect(service).toBeTruthy();
  });
});