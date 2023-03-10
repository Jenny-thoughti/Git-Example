const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'posts',
    [
      {
        user_id: 1,
        name: 'User1',
        comment_status: 'Closed',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        user_id: 1,
        name: 'User2',
        comment_status: 'In Progress',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        user_id: 5,
        name: 'User3',
        comment_status: 'Closed',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        user_id: 3,
        name: 'User4',
        comment_status: 'Closed',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        user_id: 4,
        name: 'User5',
        comment_status: 'Closed',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {},
};
