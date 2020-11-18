const app = require('app');

describe('"prerequisite" service', () => {
  it('registered the service', () => {
    const service = app.service('prerequisite');
    expect(service).toBeTruthy();
  });
});