class NewFood {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, description, price, category } = payload;

    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }

  _verifyPayload({ name, description, price, category }) {
    if (!name || !description || !price || !category) {
      throw new Error('CREATE_FOOD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof description !== 'string' || typeof price !== 'number'
       || typeof category !== 'string') {
       throw new Error('CREATE_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION'); 
    }
  }
}

module.exports = NewFood;