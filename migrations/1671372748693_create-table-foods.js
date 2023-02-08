/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('foods', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
      unique: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    price: {
      type: 'NUMERIC',
      notNull: true,
    },
    category: {
      type: 'TEXT',
      notNul: true,
    },
    isdeleted: {
      type: 'INT',
      notNull: true,
    },
    createddate: {
      type: 'TIMESTAMP',
      notNull: true,
    },
    editeddate: {
      type: 'TIMESTAMP',
      notNull: true,
    },
    createduser: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    editeduser: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  })
};

exports.down = (pgm) => {
  pgm.dropTable('foods');
};
