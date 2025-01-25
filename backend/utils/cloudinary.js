const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'xxxx', // Replace with your Cloudinary cloud name
  api_key: 'xxxx', // Replace with your Cloudinary API key
  api_secret: 'xxxx', // Replace with your Cloudinary API secret
});

module.exports = { cloudinary };
