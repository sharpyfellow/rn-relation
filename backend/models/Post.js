const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Link to User model
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);