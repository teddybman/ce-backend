const { parse } = require("pg-protocol");

class AddedFood {
  constructor(payload) {
    const newPayload = this._convertToNumber(payload);
    // console.log('New Payload :', newPayload);
    // console.log('payload AddedFood Entity : ', payload);
    this._verifyPayload(newPayload);

    const { id, name, description, price, category } = newPayload;

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.category = category;
  }

  _convertToNumber(payload) {
    let { price } = payload;
    price = parseFloat(price);
    // console.log('Price type-1 :', typeof price, price);
    // console.log('new payload :', { ...payload, price });

    return ({ ...payload, price});

  }

  _verifyPayload({ id, name, description, price, category }) {
    // const { id, name, description, price, category } = newPayload;
    // console.log('_verifyPayload :', id, name, description, price, category);
    // console.log('isNumber price :', typeof price);
    // price = parseFloat(price);

    if (!id || !name || !description || !price || !category) {
      throw new Error('ADDED_FOOD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof name !== 'string' || typeof description !== 'string' || 
      typeof price !== 'number'  || typeof category !== 'string') {
        throw new Error('ADDED_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION'); 
    }
  }
}

module.exports = AddedFood;
  