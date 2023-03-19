const express = require('express');
const router = express.Router();

const Author = require('../models/Author')
const Post = require('../models/Post')


async function getPosts() {
    try {




        const posts = await Post.findAll({
            attributes: ['id', 'post_title', 'post_date_time'],
            raw: true,
          });
          console.log(posts);
          return posts;
  
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  



router.get('/', async (req, res) => {
    try{
    const posts = await getPosts();

    const loggedIn = req.session.loggedIn

    res.render('index', { title: 'Tech Blog Home', posts, loggedIn, session: req.session });
    }
    catch(err){
        console.error(err);
        res.status(500).send(err); 
    }
  });


module.exports = router;