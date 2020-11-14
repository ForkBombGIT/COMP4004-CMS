const app = require('app');

describe('"deliverable" service', () => {
  it('registered the service', () => {
    const service = app.service('deliverable');
    expect(service).toBeTruthy();
  });
});