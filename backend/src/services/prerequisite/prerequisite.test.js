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
  it('create a prerequisite', async () => {
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
  it('update a professor', async () => {
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

    expect(checkObjectContains(createdRecord, expectedPrerequisite)).toBeTruthy();
    
    const updatedExpectedPrerequisite = {
      id: '0a73b1a3-4d46-4f8e-ad10-2852a8bbaeb1',
      prerequisite_course_id: '63b804de-c0fd-47c2-a391-5d14999c27a1',
      name: 'COMP4004',
    };

    const updatedTestPrerequisite = {...updatedExpectedPrerequisite,
      courseId: 'a11cd32c-900a-42fe-bd86-b3f554aeebcc'
    };
    
    let updatedRecord = await service.patch(updatedTestPrerequisite.id,updatedTestPrerequisite);
    expect(updatedRecord.name != createdRecord.name).toBeTruthy();

    try { 
      await service.remove(updatedExpectedPrerequisite.id);
    } catch (e) {console.log('No record to remove');}
  });
  it('removes a prerequisite', async () => {
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

    expect(checkObjectContains(createdRecord, expectedPrerequisite)).toBeTruthy();

    try { 
      await service.remove(testPrerequisite.id);
    } catch (e) {console.log('No record to remove');}

    let course = await service.find({
      query: {id: testPrerequisite.id}}
    );
    expect(course.length).toBe(0);

  });
});