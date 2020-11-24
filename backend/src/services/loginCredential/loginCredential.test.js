const app = require('app');
var assert = require('assert');

describe('"loginCredential" service', () => {
  it('registered the service', () => {
    const service = app.service('loginCredential');
    expect(service).toBeTruthy();
  });

  it ('create loginCredential and authenticate', async () => {
    const login = await app.service('loginCredential').create({
      email: 'messagetest@example.com',
      password: 'supersecret',
      user_role: 'professor'
    });

    // Ensure email got stored correctly
    assert.ok(login.email === 'messagetest@example.com');
    // Ensure password hashing
    assert.ok(login.password !== 'supersecret');
    // Ensure professor got stored correctly
    assert.ok(login.user_role === 'professor');

    const client = await app.service('authentication').create({
      strategy: 'local',
      email: 'messagetest@example.com',
      password: 'supersecret'
    });

    // Ensure the user has logged in successfully, and received a JWT token
    assert.ok(client.accessToken !== '');
  });
}); 