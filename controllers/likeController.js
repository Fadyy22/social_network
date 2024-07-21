import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const likePost = asyncHandler(async (req, res) => {
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

export const unlikePost = asyncHandler(async (req, res) => {
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
