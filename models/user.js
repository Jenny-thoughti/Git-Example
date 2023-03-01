'use strict';


const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.BIGINT(20),
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: null,
          defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: null,
          defaultValue: null,
        },
        role: {
          type: DataTypes.ENUM('Admin', 'User'),
          defaultValue: 'User',
          comment: 'Admin; User',
        },
        status: {
          type: DataTypes.ENUM('0', '1'),
          defaultValue: 1,
          values: [{active: '1', inactive: '0'}],
          attributes: ['status'],
          comment: '0: Inactive; 1: Active',
          get() {
            const values = {1: 'active', 0: 'inactive'};
            const statusValue = this.getDataValue('status');
            return values[statusValue];
          },
        },
        qualification: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: 'users',
        timestamps: false,
        scopes: {
          withoutPassword: {
            attributes: {
              exclude: ['password'],
            },
          },
          checkStatus: {
            where: {
              status: '1',
            },
          },
        },
      },
  );

  User.associate = function (models) {
    models.User.hasMany(models.Post, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  };
  return User;
};

