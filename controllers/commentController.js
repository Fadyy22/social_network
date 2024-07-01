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

  res.status(201).json({ comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await prisma.comment.delete({
    where: {
      id: req.params.id,
    }
  });

  res.status(204).end();
});
