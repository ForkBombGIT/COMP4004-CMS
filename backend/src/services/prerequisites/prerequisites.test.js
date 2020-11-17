const app = require('app');

describe('"prerequisites" service', () => {
  it('registered the service', () => {
    const service = app.service('prerequisites');
    expect(service).toBeTruthy();
  });
});