const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = asyncHandler(async (req, res) => {
  req.body.authorId = req.user.id;
  const post = await prisma.post.create({
    data: req.body,
  });

  res.status(201).json({ post });
});
