const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Storage presets ───────────────────────────────────────

const menuStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'daily-grind/menu', allowed_formats: ['jpg','jpeg','png','webp'], transformation: [{ width: 800, crop: 'limit' }] },
});

const reviewStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'daily-grind/reviews', allowed_formats: ['jpg','jpeg','png','webp'], transformation: [{ width: 600, crop: 'limit' }] },
});

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'daily-grind/avatars', allowed_formats: ['jpg','jpeg','png','webp'], transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face' }] },
});

const categoryStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'daily-grind/categories', allowed_formats: ['jpg','jpeg','png','webp'], transformation: [{ width: 600, crop: 'limit' }] },
});

const uploadMenu     = multer({ storage: menuStorage,     limits: { fileSize: 5 * 1024 * 1024 } });
const uploadReview   = multer({ storage: reviewStorage,   limits: { fileSize: 5 * 1024 * 1024 } });
const uploadAvatar   = multer({ storage: avatarStorage,   limits: { fileSize: 2 * 1024 * 1024 } });
const uploadCategory = multer({ storage: categoryStorage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { cloudinary, uploadMenu, uploadReview, uploadAvatar, uploadCategory };
