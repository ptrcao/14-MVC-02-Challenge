const express = require('express');
const router = express.Router();
const { withAuth } = require('../utils/auth')

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


  
  module.exports = router;