const app = require('app');

describe('"submits" service', () => {
  it('registered the service', () => {
    const service = app.service('submits');
    expect(service).toBeTruthy();
  });
});