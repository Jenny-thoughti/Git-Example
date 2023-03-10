const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_status: {
        type: DataTypes.ENUM('Closed', 'In Progress'),
        defaultValue: 'In Progress',
        comment: 'Closed, In Progress',
      },
      user_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
    },
    {
      tableName: 'posts',
      timestamps: false,
    },
  );

  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  };

  return Post;
};
