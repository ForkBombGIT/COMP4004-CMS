const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"prerequisite" service', () => {
  let service;
  beforeAll(() => {
    service = app.service('prerequisite');
  });
  it('registered the service', () => {
    expect(service).toBeTruthy();
  });
  it('create a deliverable', async () => {
    // Remove record if it exists

    const expectedPrerequisite = {
      id: '0a73b1a3-4d46-4f8e-ad10-2852a8bbaeb1',
      prerequisite_course_id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'COMP2406',
    };

    const testPrerequisite = {...expectedPrerequisite,
      courseId: 'a11cd32c-900a-42fe-bd86-b3f554aeebcc'
    };

    try { 
      await service.remove(testPrerequisite.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testPrerequisite);
    console.log(createdRecord);
    expect(checkObjectContains(createdRecord, expectedPrerequisite)).toBeTruthy();
  });
});