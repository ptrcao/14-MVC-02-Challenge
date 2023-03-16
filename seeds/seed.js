const sequelize = require('../config/connection');
const { readCSV } = require("../helpers/read_csv");

const path = require('path');

// const { Post, Comment, Author,
// } = require('/models');
const { Post, Comment, Author } = require(path.join(__dirname, '..', 'models', 'Index.js'));

// const Author = require(path.join(__dirname, 'Author'));
// const Comment = require(path.join(__dirname, 'Comment'));
// const Post = require(path.join(__dirname, 'Post'));

const seedAll = async() => {

await sequelize.sync({ force: true });
console.log('\n----- DATABASE SYNCED -----\n');


const authorData = await readCSV(path.join(__dirname, 'csv', 'authors.csv'));
await Author.bulkCreate(authorData);
console.log('\n----- authors SEEDED -----\n');

const postData = await readCSV(path.join(__dirname, 'csv', 'posts.csv'));
await Post.bulkCreate(postData);
console.log('\n----- posts SEEDED -----\n')

const commentData = await readCSV(path.join(__dirname, 'csv', 'comments.csv'));
await Comment.bulkCreate(commentData);
console.log('\n----- comments SEEDED -----\n');

// Based on the foreign key constraint error message in the seed file, it seems that the product_category table should be seeded first, as it is referenced by the product table through its product_category_id column. Therefore, before any product can be inserted into the product table, the corresponding product category must already exist in the product_category table.





process.exit(0);
}

seedAll();