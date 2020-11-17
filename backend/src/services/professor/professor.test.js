const app = require('app');

describe('"professor" service', () => {
  it('registered the service', () => {
    const service = app.service('professor');
    expect(service).toBeTruthy();
  });
});