const express = require('express');
const router = express.Router();

const withAuth = require('../utils/auth')

// const Author = require('../models/Author')
// const Post = require('../models/Post')
// const Comment = require('../models/Comment')
const path = require('path');
// const Author = require(path.join(__dirname, '..', 'models', 'Author'));
// const Post = require(path.join(__dirname, '..', 'models', 'Post'));
// const Comment = require(path.join(__dirname, '..', 'models', 'Comment'));

const { Post, Author, Comment } = require(path.join(__dirname, '..', 'models', 'Index'));


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
        // const postData = await Post.findByPk(req.params.id, {
        //     include: [
        //       Author,
        //     //   {
        //     //     model: Comment,
        //     //     include: [Author],
        //     //   },
        //     ],
        //   });


        // const postData = await Post.findByPk(req.params.id);

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
        })
         
        const comments = commentData.map((post) => post.get({ plain: true }));
    
        const singlePost = postData.get({ plain: true });
        // res.render('post', {
        //     ...singlePost,
        //     comments,
             
        //     logged_in: req.session.logged_in
        //   });
    


        // const post = postData.get({ plain: true });
    //   const post = await Post.findByPk(req.params.id, {
    //     include: [
    //       {
    //         model: Author,
    //         as: 'author',
    //         attributes: ['id', 'username'],
    //       },
    //     ],
    //     raw: true,
    //   });
  
    //   const comments = await Comment.findAll({
    //     where: { post_id: req.params.id },
    //     include: [
    //       {
    //         model: Author,
    //         attributes: ['id', 'username'],
    //       },
    //     ],
    //     order: [['comment_date_time', 'DESC']],
    //     raw: true,
    //   });
          return { singlePost, comments };
    // return { post, comments };

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
    // const postData = await Post.findByPk(req.params.id, {
    //     include: [
    //       {
    //         model: Author,
    //         attributes: ['id', 'username'],
    //       },
    //     ],
    //   });
      
    // const commentData = await Comment.findAll({
    //   where:{
    //     post_id: req.params.id
    //   },
    //   include: [
    //     {
    //         model: Author,
    //         attributes: ['id', 'username'],
    //       },
    //   ],
    // })
     
    // const comments = commentData.map((post) => post.get({ plain: true }));

    // const singlePost = postData.get({ plain: true });

    res.render('post', {
        singlePost,
        comments,
        loggedIn: req.session.loggedIn
      });





    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  

module.exports = router;