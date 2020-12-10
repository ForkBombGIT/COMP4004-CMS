const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');
const { paramsForServer } = require('feathers-hooks-common');

describe('"student" service', () => {
  let service;
  const email = 'james@gmail.com';

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
      birth_date: '2020-01-01',
    };

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testStudent, paramsForServer({
      data:{
        email
      }
    }));

    expect(checkObjectContains(createdRecord, testStudent)).toBeTruthy();
  });
  
  it('update a student', async () => {
    // Remove record if it exists

    const testStudent = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'james',
      birth_date: '2020-01-01',
    };

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testStudent, paramsForServer({
      data:{
        email
      }
    }));

    expect(checkObjectContains(createdRecord, testStudent)).toBeTruthy();
    
    const updateStudent = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'billy',
      birth_date: '2020-01-01',
    };
    
    let updatedRecord = await service.patch(updateStudent.id,updateStudent, paramsForServer({
      data:{
        email
      }
    }));
    expect(updatedRecord.name != createdRecord.name).toBeTruthy();

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}
  });

  it('removes a student', async () => {
    // Remove record if it exists

    const testStudent = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba4257',
      name: 'james',
      birth_date: '2020-01-01',
    };

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testStudent, paramsForServer({
      data:{
        email
      }
    }));

    expect(checkObjectContains(createdRecord, testStudent)).toBeTruthy();

    try { 
      await service.remove(testStudent.id);
    } catch (e) {console.log('No record to remove');}

    let student = await service.find({
      query: {id: testStudent.id}}
    );
    expect(student.length).toBe(0);

  });
});