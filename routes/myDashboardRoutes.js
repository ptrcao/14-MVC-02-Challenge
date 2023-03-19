const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth')

const path = require('path');

const { Post, Author, Comment } = require(path.join(__dirname, '..', 'models', 'Index'));

async function getMyPosts(myId) {
    try {
        const myPosts = await Post.findAll({
            attributes: ['id', 'post_title', 'post_date_time'],
            where: {
                post_author_id: myId
              },
            raw: true,
          });
          console.log(myPosts);
          return myPosts;
  
    } catch (error) {
      console.error('Error fetching my posts:', error);
    }
  }
  

router.get('/', withAuth, async (req, res) => {
    try{

        
    const myPosts = await getMyPosts(req.session.authorId);

    

    res.render('my-dashboard', { title: 'My Dashboard', myPosts, session: req.session });
    }
    catch(err){
        console.error(err);
        res.status(500).send(err); 
    }
  });


  
  router.post('/new-post', withAuth, async (req, res) => {
    try {
      const { title, content } = req.fields;
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