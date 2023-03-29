const express = require('express');
const router = express.Router();

const { withAuth } = require('../utils/auth')

// const Author = require('../models/Author')
// const Post = require('../models/Post')
// const Comment = require('../models/Comment')
const path = require('path');
// const Author = require(path.join(__dirname, '..', 'models', 'Author'));
// const Post = require(path.join(__dirname, '..', 'models', 'Post'));
// const Comment = require(path.join(__dirname, '..', 'models', 'Comment'));

const { Post, Author, Comment } = require(path.join(__dirname, '..', 'models', 'Index'));


// This has to come before /:id otherwise it will assume that you are passing a post id and return not found
router.get('/new-post', withAuth, async (req, res) => {
    res.render('new-post', {session: req.session})
  });


async function getPost(req) {
    try {

        const postData = await Post.findByPk(req.params.id, {
            include: {
              model: Author,
              attributes: ['username'],
            },
            attributes: { exclude: ['post_author_id'] },
          });


        const commentData = await Comment.findAll({
          where:{
            post_id: req.params.id
          },
          include: [{ model: Author }],
          order: [['comment_date_time', 'DESC']]
        })
         
        const comments = commentData.map((post) => post.get({ plain: true }));
    
        const singlePost = postData.get({ plain: true });
 
          return { singlePost, comments };

    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
  
  




// function use()

  router.get('/:id', withAuth, async (req, res) => {
    try {

    //   console.log("Login - req.session.loggedIn:", req.session.loggedIn);

    //   const post = await getPost(req);

    //   const loggedIn = req.session.loggedIn

    //   res.render('post', { post, loggedIn });


    const { singlePost, comments } = await getPost(req)

        console.log(singlePost)
        console.log(comments)
   
    res.render('post', {
        singlePost,
        comments,
        session: req.session,
        loggedIn: req.session.loggedIn
      });





    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  


  router.post('/:id/new-comment', withAuth, async (req, res) => {
    try {


        const newComment = await Comment.create({
            comment_content: req.body.commentText,
            comment_date_time: Math.floor(Date.now() / 1000),
            comment_author_id: req.session.authorId,
            post_id: req.params.id
      });
  
    //   res.status(200).json(newComment);
    res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  


module.exports = router;