const withAuth = (req, res, next) => {
    
    console.log('withAuth middleware called');
    console.log('req.session:', req.session);
    console.log('req.session.loggedIn:', req.session.loggedIn);

    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
};
  
// In Node.js projects, the general approach to securing edit and delete links for posts is to use middleware to check if the user is authenticated and authorized to perform these actions.

const withPostAuthorAuth = async (req, res, next) => {

    const {Post, Comment, Author} = require('../models/Index');




    const postId = req.params.id
    const authorId = req.session.authorId;


    // if post does not exist
    const post = await Post.findByPk(postId);
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

    // if post author is not the same as session author
    if ( post.post_author_id !== authorId ) {
        res.status(401).json({ message: 'You are not authorized to edit this post' });
        return;
      }
      
      // if author does not exist
      const author = await Author.findByPk(authorId);
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }
      
      else {
        next();
      }

    
};


const withCommentAuthorAuth = async (req, res, next) => {
    console.log("here----------------------")
    const {Post, Comment, Author} = require('../models/Index');


    const commentId = req.params.id
    const authorId = req.session.authorId;


    // if post does not exist
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
      }

    // if post author is not the same as session author
    if ( comment.comment_author_id !== authorId ) {
        res.status(401).json({ message: 'You are not authorized to edit this post' });
        return;
      }
      
      // if author does not exist
      const author = await Author.findByPk(authorId);
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }
      
      else {
        next();
      }

    
};


  module.exports = { withAuth, withPostAuthorAuth, withCommentAuthorAuth };
  