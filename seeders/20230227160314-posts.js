'use strict';

const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'posts',
        [
          {
            user_id: 1,
            name: 'User1.',
            comment_status: 'Completed',
            created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            user_id: 1,
            name: 'User1.',
            comment_status: 'Process',
            created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            user_id: 5,
            name: 'User2',
            comment_status: 'Almost Done',
            created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            user_id: 3,
            name: 'User3',
            comment_status: 'Completed',
            created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            user_id: 4,
            name: 'User4',
            comment_status: 'Completed',
            created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
        ],
        {},
    );
  },

  down: (queryInterface, Sequelize) => {},
};
