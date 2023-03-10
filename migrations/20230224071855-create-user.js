module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notNull: true,
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
      type: Sequelize.ENUM('Admin', 'User'),
      defaultValue: 'User',
      comment: 'Admin; User',
    },
    status: {
      type: Sequelize.ENUM('0', '1'),
      defaultValue: '1',
      comment: '0: Inactive; 1: Active',
    },
    qualification: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    access_token: {
      type: Sequelize.TEXT('long'),
      allowNull: null,
      defaultValue: null,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
