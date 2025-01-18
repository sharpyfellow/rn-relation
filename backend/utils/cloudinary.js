const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dhb0lbi4w', // Replace with your Cloudinary cloud name
  api_key: '977595166934669', // Replace with your Cloudinary API key
  api_secret: 'ciHqHiRXP0PKaDJWTM-ap5QkJrw', // Replace with your Cloudinary API secret
});

module.exports = { cloudinary };