'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        // eslint-disable-next-line new-cap
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: null,
      },
      role: {
        // eslint-disable-next-line new-cap
        type: Sequelize.ENUM('Admin', 'User'),
        defaultValue: 'User',
        comment: 'Admin; User',
      },
      status: {
        // eslint-disable-next-line new-cap
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '1',
        comment: '0: Inactive; 1: Active',
      },
      qualification: {
        type: Sequelize.STRING,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};


