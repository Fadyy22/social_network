const express = require('express');

const {
  parseProfileImage,
  createProfileImage,
  getUserProfile,
  addFriend,
  acceptFriendRequest,
} = require('../controllers/userController');

const {
  addFriendValidator,
  acceptFriendRequestValidator,
} = require('../utils/validators/userValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.patch('/profile-img', isAuth, parseProfileImage, createProfileImage);

router
  .route('/:id')
  .get(isAuth, getUserProfile);

router.post('/:id/add', isAuth, addFriendValidator, addFriend);
router.post('/:id/accept', isAuth, acceptFriendRequestValidator, acceptFriendRequest);

module.exports = router;
