const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"academicDeadline" service', () => {
  let service;
  beforeAll(() => {
    service = app.service('academicDeadline');
  });
  it('registered the service', async () => {
    expect(service).toBeTruthy();
  });
  it('create a academicDeadline', async () => {
    const due_date = new Date();
    // Remove record if it exists
    const testAcademicDeadline = {
      id: '99d21783-f1e1-4bba-b163-a4a56dba4257',
      type: 'registration',
      due_date: due_date,
    };

    try { 
      await service.remove(testAcademicDeadline.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testAcademicDeadline);

    expect(checkObjectContains(createdRecord, testAcademicDeadline)).toBeTruthy();
  });
});