const app = require('app');
const { checkObjectContains } = require('utils/helpers.js');
const { paramsForServer } = require('feathers-hooks-common');

describe('"administrator" service', () => {
  let service;
  const email = 'james@gmail.com';

  beforeAll(() => {
    service = app.service('administrator');
  });

  it('registered the service', ()=> {
    expect(service).toBeTruthy();
  });
  it('creates an administrator', async () => {
    // Remove record if it exists

    const testAdministrator = {
      id: '99d21763-f1e1-4bba-b163-b4a56dba5257',
      name: 'james'
    };

    try { 
      await service.remove(testAdministrator.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testAdministrator, paramsForServer({
      data:{
        email
      }
    }));


    expect(checkObjectContains(createdRecord, testAdministrator)).toBeTruthy();
  });

  it('update a administrator', async () => {
    // Remove record if it exists

    const testAdministrator = {
      id: '99d21763-f1e1-4bba-b163-b4a56dba5257',
      name: 'james'
    };

    try { 
      await service.remove(testAdministrator.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testAdministrator, paramsForServer({
      data:{
        email
      }
    }));


    expect(checkObjectContains(createdRecord, testAdministrator)).toBeTruthy();
    
    const updateAdministrator = {
      id: '99d21763-f1e1-4bba-b163-b4a56dba5257',
      name: 'billy',
    };
    
    let updatedRecord = await service.patch(updateAdministrator.id,updateAdministrator, paramsForServer({
      data:{
        email
      }
    }));
    expect(updatedRecord.name != createdRecord.name).toBeTruthy();

    try { 
      await service.remove(updateAdministrator.id);
    } catch (e) {console.log('No record to remove');}
  });

  it('removes a administrator', async () => {
    // Remove record if it exists

    const testAdministrator = {
      id: '99d21763-f1e1-4bba-b163-b4a56dba5257',
      name: 'james'
    };

    try { 
      await service.remove(testAdministrator.id);
    } catch (e) {console.log('No record to remove');}

    let createdRecord = await service.create(testAdministrator, paramsForServer({
      data:{
        email
      }
    }));


    expect(checkObjectContains(createdRecord, testAdministrator)).toBeTruthy();

    try { 
      await service.remove(testAdministrator.id);
    } catch (e) {console.log('No record to remove');}

    let admin = await service.find({
      query: {id: testAdministrator.id}}
    );
    expect(admin.length).toBe(0);

  });
});