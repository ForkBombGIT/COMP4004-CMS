const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');
const { paramsForServer } = require('feathers-hooks-common');

describe('"course" service', () => {  
  let service;
  let date;
  beforeAll(() => {
    service = app.service('course');
    date = new Date();
  });
  
  it('registered the service', () => {
    expect(service).toBeTruthy();
  });

  it('create a course', async () => {
    // Remove record if it exists
    const deadlines = {
      courseRegistrationDate: date,
      courseWithdrawDate: date,
    };

    const testCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
    };

    try { 
      await service.remove(testCourse.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testCourse,paramsForServer({
      data: deadlines
    }));

    expect(checkObjectContains(createdRecord, testCourse)).toBeTruthy();
  });
  
  it('update a course', async () => {
    // Remove record if it exists
    const deadlines = {
      courseRegistrationDate: date,
      courseWithdrawDate: date,
    };

    const testCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
    };

    try { 
      await service.remove(testCourse.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testCourse,paramsForServer({
      data: deadlines
    }));

    expect(checkObjectContains(createdRecord, testCourse)).toBeTruthy();
    
    const updateCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse2',
    };
    
    let updatedRecord = await service.patch(updateCourse.id,updateCourse);
    expect(updatedRecord.name != createdRecord.name).toBeTruthy();

    try { 
      await service.remove(updateCourse.id);
    } catch (e) {console.log('No record to remove');}
  });

  it('reschedule a course', async () => {
    // Remove record if it exists
    const deadlines = {
      courseRegistrationDate: date,
      courseWithdrawDate: date,
    };

    const testCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
      status: 'unscheduled',
    };

    try { 
      await service.remove(testCourse.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testCourse,paramsForServer({
      data: deadlines
    }));
    
    expect(checkObjectContains(createdRecord, testCourse)).toBeTruthy();
    
    const updateCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
      status: 'inprogress',
    };
    
    let updatedRecord = await service.patch(updateCourse.id,updateCourse);
    expect(updatedRecord.status === 'inprogress').toBeTruthy();

    try { 
      await service.remove(updateCourse.id);
    } catch (e) {console.log('No record to remove');}
  });

  it('removes a course', async () => {
    // Remove record if it exists
    const deadlines = {
      courseRegistrationDate: date,
      courseWithdrawDate: date,
    };

    const testCourse = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'testcourse',
    };

    try { 
      await service.remove(testCourse.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testCourse,paramsForServer({
      data: deadlines
    }));

    expect(checkObjectContains(createdRecord, testCourse)).toBeTruthy();

    try { 
      await service.remove(testCourse.id);
    } catch (e) {console.log('No record to remove');}

    let course = await service.find({
      query: {id: testCourse.id}}
    );
    expect(course.length).toBe(0);

  });
});