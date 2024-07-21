import {
  likePost,
  unlikePost,
} from '../controllers/likeController.js';

import {
  likePostValidator,
  unlikePostValidator,
} from '../utils/validators/likeValidator.js';

const likeRouter = {
  like: [likePostValidator, likePost],
  unlike: [unlikePostValidator, unlikePost],
};

export default likeRouter;
