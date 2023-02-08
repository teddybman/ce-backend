const FoodsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'foods',
  register: async (server, { container }) => {
    const foodsHandler = new FoodsHandler(container);
    server.route(routes(foodsHandler));
  },
};