const express = require('express');

const {
  getUserProfile,
} = require('../controllers/userController');

// const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/:id')
  .get(getUserProfile);

module.exports = router;
