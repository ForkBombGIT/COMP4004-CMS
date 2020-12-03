const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"deliverable" service', () => {
  let service;
  beforeAll(() => {
    service = app.service('course');
  });
  it('registered the service', () => {
    expect(service).toBeTruthy();
  });
  it('create a deliverable', async () => {
    // Remove record if it exists

    const testDeliverable = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testdeliverable',
    };

    try { 
      await service.remove(testDeliverable.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testDeliverable);

    expect(checkObjectContains(createdRecord, testDeliverable)).toBeTruthy();
  });
  it('removes a deliverable', async () => {
    // Remove record if it exists

    const testDeliverable = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
    };

    try { 
      await service.remove(testDeliverable.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testDeliverable);

    expect(checkObjectContains(createdRecord, testDeliverable)).toBeTruthy();

    try { 
      await service.remove(testDeliverable.id);
    } catch (e) {console.log('No record to remove');}

    let course = await service.find({
      query: {id: testDeliverable.id}}
    );
    expect(course.length).toBe(0);

  });
 
});