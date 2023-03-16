const express = require('express');
const router = express.Router();

const withAuth = require('../utils/auth')

const Author = require('../models/Author')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

// async function getPost(req) {
//     try {
//         const post = await Post.findByPk(req.params.id, {
//             // attributes: ['id', 'post_title', 'post_content', 'post_date_time'],
//             include: [
//               {
//                 model: Comment,
//                 // attributes: ['id', 'comment_content', 'comment_date_time'],
//                 include: [
//                   {
//                     model: Author,
//                     attributes: ['id', 'username'],
//                   },
//                 ],
//                 order: [['comment_date_time', 'DESC']],
//                 where: {
//                     post_id: req.params.id
//                   }
//               },
//               {
//                 model: Author,
//                 as: 'author',
//                 attributes: ['id', 'username'],
//               },
//             ],
//             raw: true,
//           });
//           console.log('Here be post: ' + JSON.stringify(post));
//           console.log('Here be post comments: ' + post.comment)
//           return post;
  
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }
  

  



async function getPost(req) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Author,
            as: 'author',
            attributes: ['id', 'username'],
          },
        ],
        raw: true,
      });
  
      const comments = await Comment.findAll({
        where: { post_id: req.params.id },
        include: [
          {
            model: Author,
            attributes: ['id', 'username'],
          },
        ],
        order: [['comment_date_time', 'DESC']],
        raw: true,
      });
  
      return { post, comments };
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
  
  
// function use()

  router.get('/:id', withAuth, async (req, res) => {
    try {

      console.log("Login - req.session.logged_in:", req.session.logged_in);

      const { post, comments } = await getPost(req);

      const loggedIn = req.session.logged_in

      res.render('post', { post, comments, loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  

module.exports = router;