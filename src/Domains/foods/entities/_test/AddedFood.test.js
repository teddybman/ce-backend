const AddedFood = require('../AddedFood');

describe('AddedFood entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'food-123',
      name: 'rice',
      description: 'contain rice',
      category: 'food',
    };

    expect(() => new AddedFood(payload)).toThrowError('ADDED_FOOD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'food-123',
      name: 'rice',
      description: 'contain rice',
      category: 'food',
      price: 'aaa',
    };

    expect(() => new AddedFood(payload)).toThrowError('ADDED_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedFood object correctly', () => {
    const payload = {
      id: 'food-123',
      name: 'rice',
      description: 'contain rice',
      category: 'food',
      price: 1000,
    };

    const { id, name, description, category, price } = payload;
    
    expect(id).toEqual(payload.id);
    expect(name).toEqual(payload.name);
    expect(description).toEqual(payload.description);
    expect(category).toEqual(payload.category);
    expect(price).toEqual(payload.price);
  });
})