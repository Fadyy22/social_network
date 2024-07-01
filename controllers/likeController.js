const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.likePost = asyncHandler(async (req, res) => {
  await prisma.like.create({
    data: {
      userId: req.user.id,
      postId: req.params.id,
    }
  });

  await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      likesCount: {
        increment: 1,
      }
    }
  });

  res.status(201).json({ message: 'Post liked' });
});

exports.unlikePost = asyncHandler(async (req, res) => {
  await prisma.like.delete({
    where: {
      postId_userId: {
        postId: req.params.id,
        userId: req.user.id,
      }
    }
  });

  await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      likesCount: {
        decrement: 1,
      }
    }
  });

  res.status(204).end();
});
