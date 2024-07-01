const express = require('express');

const {
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

router
  .route('/:id')
  .get(isAuth, getUserProfile);

router.post('/:id/add', isAuth, addFriendValidator, addFriend);
router.post('/:id/accept', isAuth, acceptFriendRequestValidator, acceptFriendRequest);

module.exports = router;
