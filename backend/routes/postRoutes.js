const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// Create a new post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    console.log('Authenticated user ID:', req.user); // Log the authenticated user ID

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const post = new Post({
      title,
      description,
      postedBy: req.user,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
router.get('/get-all-post', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().populate('postedBy', 'name email');
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts
router.get('/get-all', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get posts by the authenticated user
router.get('/get-user-post', authMiddleware, async (req, res) => {
  try {
    console.log('Authenticated user ID:', req.user); // Debugging log

    const posts = await Post.find({ postedBy: req.user });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post by ID
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user owns the post
    if (post.postedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    // Delete the post using deleteOne
    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post by ID
router.put('/update-post/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user owns the post
    if (post.postedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }

    post.title = title || post.title;
    post.description = description || post.description;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;