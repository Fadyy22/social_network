const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      userId: req.user.id,
      postId: req.params.postId,
      content: req.body.content,
    }
  });

  await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      commentsCount: {
        increment: 1,
      }
    }
  });

  res.status(201).json({ comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await prisma.comment.delete({
    where: {
      id: req.params.id,
    }
  });

  await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      commentsCount: {
        decrement: 1,
      }
    }
  });

  res.status(204).end();
});
