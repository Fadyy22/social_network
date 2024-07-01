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

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          profile_img: true,
          firstName: true,
          lastName: true,
        }
      },
      likes: {
        select: {
          userId: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  posts.forEach(post => {
    post.isLiked = post.likes.some(like => like.userId === req.user.id);
    delete post.likes;
  });


  res.status(200).json({ posts });
});

exports.getPost = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile_img: true,
        }
      },
      comments: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profile_img: true,
            }
          },
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      },
      likes: {
        select: {
          userId: true,
        }
      }
    }
  });

  post.isLiked = post.likes.some(like => like.userId === req.user.id);
  delete post.likes;

  res.status(200).json({ post });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
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

  delete post.authorId;

  res.status(200).json({ post });
});

exports.deletePost = asyncHandler(async (req, res) => {
  await prisma.post.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});
