const moment = require('moment');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@gmail.com',
        user_name: 'admin',
        password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        role: 'Admin',
        status: '1',
        qualification: 'MSC',
      },
      {
        first_name: 'Test1',
        last_name: 'User 1',
        email: 'user1@gmail.com',
        user_name: 'user1',
        password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        role: 'User',
        status: '1',
        qualification: 'MCA',
      },
      {
        first_name: 'Test2',
        last_name: 'User 2',
        email: 'user2@gmail.com',
        user_name: 'user2',
        password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        role: 'User',
        status: '1',
        qualification: 'BE',
      },
      {
        first_name: 'Test3',
        last_name: 'User 3',
        email: 'user3@gmail.com',
        user_name: 'user3',
        password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        role: 'User',
        status: '0',
        qualification: 'ME',
      },
      {
        first_name: 'Test4',
        last_name: 'User 4',
        email: 'user4@gmail.com',
        user_name: 'user4',
        password: bcrypt.hashSync('jenny@123', BCRYPT_SALT_ROUNDS),
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        role: 'User',
        status: '0',
        qualification: 'BCOM',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {},
};
