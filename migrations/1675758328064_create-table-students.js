/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('students', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      name: {
        type: 'TEXT',
        notNull: true,
        unique: true,
      },
      class: {
        type: 'TEXT',
        notNull: true,
      },
      restriction: {
        type: 'TEXT',
        notNull: true,
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
    pgm.dropTable('students');
  };
  