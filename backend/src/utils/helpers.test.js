const { checkObjectContains } = require('./helpers');

describe('checkObjectContains', () => {

  it('It can find if an object contains all properties of another', () => {
    const obj1 = {
      name: 'fred',
      email: 'fred@gmail',
    };
    const obj2 = {
      name: 'fred',
      email: 'fred@gmail',
      phone: '905-543-415'
    };

    expect(checkObjectContains(obj1, obj2)).toBe(true);
    expect(checkObjectContains(obj2, obj1)).toBe(false);
  });
});