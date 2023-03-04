'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const JwtToken = sequelize.define(
      'JwtToken',
      {
        id: {
          type: DataTypes.BIGINT(20),
          primaryKey: true,
          autoIncrement: true,
        },
        token: DataTypes.TEXT('long'),
        createdAt: {
          type: DataTypes.DATE,
          allowNull: null,
          defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: null,
          defaultValue: null,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        status: {
          type: DataTypes.ENUM('0', '1'),
          defaultValue: '0',
          comment: '0: Inactive; 1: Active',
        },
      },
      {
        tableName: 'jwt_tokens',
      },
  );
  // eslint-disable-next-line no-unused-vars
  JwtToken.associate = function(models) {
    // associations can be defined here
  };
  return JwtToken;
};
