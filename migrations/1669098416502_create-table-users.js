/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('users', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      username: {
        type: 'VARCHAR(50)',
        notNull: true,
        unique: true,
      },
      fullname: {
        type: 'TEXT',
        notNull: true,
      },
      email: {
        type: 'VARCHAR(50)',
        notNull: true,
        unique: true,
      },
      password: {
        type: 'TEXT',
        notNull: true,
      },
      level: {
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
    });
  };
   
  exports.down = (pgm) => {
    pgm.dropTable('users');
  };
