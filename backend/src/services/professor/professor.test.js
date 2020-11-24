const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');

describe('"professor" service', () => {
  let service;

  beforeAll(() => {
    service = app.service('professor');
  });

  it('registered the service', ()=> {
    expect(service).toBeTruthy();
  });
  it('creates an professor', async () => {
    // Remove record if it exists

    const testProfessor = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba5257',
      name: 'james'
    };

    try { 
      await service.remove(testProfessor.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testProfessor);

    expect(checkObjectContains(createdRecord, testProfessor)).toBeTruthy();
  });
  it('removes a professor', async () => {
    // Remove record if it exists

    const testProfessor = {
      id: '99d21763-f1e1-4bba-b163-a4a56dba5257',
      name: 'james'
    };

    try { 
      await service.remove(testProfessor.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testProfessor);

    expect(checkObjectContains(createdRecord, testProfessor)).toBeTruthy();

    try { 
      await service.remove(testProfessor.id);
    } catch (e) {console.log('No record to remove');}

    let professor = await service.find({
      query: {id: testProfessor.id}}
    );
    expect(professor.length).toBe(0);

  });
});