const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"application" service', () => {
  let service;

  beforeAll(() => {
    service = app.service('application');
  });

  it('registered the service', ()=> {
    expect(service).toBeTruthy();
  });
  it('creates an application', async () => {
    // Remove record if it exists

    const testApplication = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba5257',
      name: 'james',
      birth_date: '2020-01-01',
      email: 'james@gmail.com'
    };

    try { 
      await service.remove(testApplication.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testApplication);
    console.log(createdRecord);

    expect(checkObjectContains(createdRecord, testApplication)).toBeTruthy();
  });

});