const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"student" service', () => {
  let service;

  beforeAll(() => {
    service = app.service('student');
  });

  it('registered the service', () => {
    expect(service).toBeTruthy();
  });
  it('create a student', async () => {
    // Remove record if it exists

    const testStudent = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'james',
    };

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testStudent);

    expect(checkObjectContains(createdRecord, testStudent)).toBeTruthy();
  });
  it('removes a student', async () => {
    // Remove record if it exists

    const testStudent = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'james',
    };

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testStudent);

    expect(checkObjectContains(createdRecord, testStudent)).toBeTruthy();

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let professor = await service.find({
      query: {id: testStudent.id}}
    );
    expect(professor.length).toBe(0);

  });
});