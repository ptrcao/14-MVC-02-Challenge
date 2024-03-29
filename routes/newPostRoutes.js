const express = require('express');
const router = express.Router();
const { withAuth } = require('../utils/auth')

const path = require('path');

const { Post, Author, Comment } = require(path.join(__dirname, '..', 'models', 'Index'));


router.get('/new-post', withAuth, async (req, res) => {
    try {
        res.render('new-post', { session: req.session });
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
  })

  
  router.post('/new-post', withAuth, async (req, res) => {
    try {
        console.log(req.body)
      const { title, content } = req.body;
      console.log('title: ', title, ', content: ', content)
      console.log('Yo yo: ', req.session.authorId)
      const myPost = await Post.create({
        post_title: title,
        post_content: content,
        post_date_time: Math.floor(Date.now() / 1000),
        post_author_id: req.session.authorId
      });

      console.log('myPost.id is: ', myPost.id)


      res.json(myPost); // Return the newly created post as a JSON object, the frontend will need to know the new post id to redirect there

    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });


  module.exports = router;