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

exports.getAllPosts = asyncHandler(async (_req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          profile_img: true,
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  posts.forEach(post => {
    delete post.authorId;
  });

  res.status(200).json({ posts });
});
