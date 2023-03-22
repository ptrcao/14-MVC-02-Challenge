const express = require('express');
const router = express.Router();

const Author = require('../models/Author')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const { withAuth, withPostAuthorAuth, withCommentAuthorAuth } = require('../utils/auth')


router.put('/comment/:id/edit-comment', withAuth, withCommentAuthorAuth, async (req, res) => {
console.log("in edit comment")
    try {
        const commentData = await Comment.update(
          {
            comment_content: req.body.comment_content,
            comment_edited_date_time: Math.floor(Date.now() / 1000)
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
    
        if (!commentData[0]) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
    
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }

});


module.exports = router;