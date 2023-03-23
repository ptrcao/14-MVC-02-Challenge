const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comment_date_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_edited_date_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment_author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
  },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
