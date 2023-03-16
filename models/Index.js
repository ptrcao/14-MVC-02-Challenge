// import models
const path = require('path');
// const Author = require(path.join(__dirname, 'Author'));
// const Comment = require(path.join(__dirname, 'Comment'));
// const Post = require(path.join(__dirname, 'Post'));

const Author = require('./Author');
const Comment = require('./Comment');
const Post = require('./Post');

Author.hasMany(Comment, {
    foreignKey: 'comment_author_id',
  });
Author.hasMany(Post, {
foreignKey: 'post_author_id',
});


Comment.belongsTo(Author, {
foreignKey: 'comment_author_id',
});
Post.belongsTo(Author, {
    foreignKey: 'post_author_id',
    as: 'author',
});


Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    });
Post.hasMany(Comment, {
    foreignKey: 'post_id',
})


  module.exports = {
    Post,
    Comment,
    Author,
  };