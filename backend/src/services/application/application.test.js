const app = require('app');

describe('"application" service', () => {
  it('registered the service', () => {
    const service = app.service('application');
    expect(service).toBeTruthy();
  });
});