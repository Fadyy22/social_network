const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profile_img: true,
      posts: true,
    }
  });

  res.status(200).json({ user });
});

exports.addFriend = asyncHandler(async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      friendRequests: {
        connect: {
          id: req.params.id,
        }
      }
    }
  });

  res.status(201).json({ message: "Request sent" });
});

exports.acceptFriendRequest = asyncHandler(async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.user.id
    },
    data: {
      friendRequestsOf: {
        disconnect: {
          id: req.params.id
        }
      },
      friends: {
        connect: {
          id: req.params.id
        }
      },
      friendOf: {
        connect: {
          id: req.params.id,
        }
      }
    }
  });

  res.status(201).json({ message: "Friend added" });
});
