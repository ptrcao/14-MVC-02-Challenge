const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_date_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_edited_date_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    post_author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
