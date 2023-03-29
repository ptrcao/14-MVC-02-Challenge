const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// DELETE /post/:id/delete
router.delete('/:id/delete', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;