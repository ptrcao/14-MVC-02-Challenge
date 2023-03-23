const express = require('express');
const router = express.Router();

const Author = require('../models/Author')
const Post = require('../models/Post')

const { withAuth, withPostAuthorAuth, withCommentAuthorAuth } = require('../utils/auth')



router.put('/post/:id/edit-post', withAuth, withPostAuthorAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
          {
            post_content: req.body.post_content,
            post_date_time: Math.floor(Date.now() / 1000)
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
  });
  
  router.post('/post/:id/delete', withAuth, withCommentAuthorAuth, async (req, res) => {
    // delete the post from the database and redirect to the homepage
    try {
        const post = await Post.findByPk(req.params.id);
        await post.destroy();
        // res.redirect('/');
        res.status(200).send();
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    
    
  });

  module.exports = router;