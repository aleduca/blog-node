'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.post, {
        foreignKey: 'categoryId',
        as: 'posts',
      });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'category',
    }
  );
  return category;
};
