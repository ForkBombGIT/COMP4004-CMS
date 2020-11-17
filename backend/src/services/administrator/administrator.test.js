const app = require('app');

describe('"administrator" service', () => {
  it('registered the service', () => {
    const service = app.service('administrator');
    expect(service).toBeTruthy();
  });
});