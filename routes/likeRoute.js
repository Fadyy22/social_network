const {
  likePost,
  unlikePost,
} = require('../controllers/likeController');

const {
  likePostValidator,
  unlikePostValidator,
} = require('../utils/validators/likeValidator');

const likeRouter = {
  like: [likePostValidator, likePost],
  unlike: [unlikePostValidator, unlikePost],
};

module.exports = likeRouter;
