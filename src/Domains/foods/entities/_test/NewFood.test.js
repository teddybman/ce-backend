const NewFood = require('../NewFood');

describe('a NewFood entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      name: 'rice',
      description: 'contain rice',
      category: 'food',
    };

    expect(() => new NewFood(payload)).toThrowError('CREATE_FOOD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
        name: 'rice',
        description: 123456,
        category: 'food',
        price: 1000,
    };

    expect(() => new NewFood(payload)).toThrowError('CREATE_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewFood object correctly', () => {
    const payload = {
      name: 'rice',
      description: 'contain rice',
      category: 'food',
      price: 1000,
    };

    const { name, description, category, price } = new NewFood(payload);

    expect(name).toEqual(payload.name);
    expect(description).toEqual(payload.description);
    expect(category).toEqual(payload.category);
    expect(price).toEqual(payload.price);
  });
})