'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });

      post.hasOne(models.cover, {
        foreignKey: 'id',
        sourceKey: 'coverId',
        as: 'cover',
      });

      post.hasMany(models.comment, {
        foreignKey: 'postId',
        as: 'comments',
      });
    }
  }
  post.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      coverId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'post',
    }
  );
  return post;
};
