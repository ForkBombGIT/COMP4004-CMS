const app = require('app');

describe('"teaches" service', () => {
  it('registered the service', () => {
    const service = app.service('teaches');
    expect(service).toBeTruthy();
  });
});