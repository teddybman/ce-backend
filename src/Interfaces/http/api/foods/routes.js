const routes = (handler) => ([
  {
    method: 'POST',
    path: '/foods',
    handler: handler.postFoodHandler,
    options: {
      auth: 'ce_jwt',
    },
  },
    
  {
    method: 'GET',
    path: '/foods',
    handler: handler.getFoodHandler,
    options: {
      auth: 'ce_jwt',
    },
  },

  {
    method: 'PUT',
    path: '/foods/{foodName}',
    handler: handler.editFoodHandler,
    options: {
      auth: 'ce_jwt',
    },
  },

  {
    method: 'DELETE',
    path: '/foods/{foodId}',
    handler: handler.deleteFoodHandler,
    options: {
      auth: 'ce_jwt',
    },
  },
]);
  
module.exports = routes;