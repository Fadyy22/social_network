import fs from 'fs';

import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

import cloudinary from '../utils/cloudinary.js';

const prisma = new PrismaClient();

const multerStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/profile_images');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `profile-${req.user.id}-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});

const uploadProfileImage = async (image, res) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(image.path);
    fs.unlinkSync(image.path);
    return secure_url;
  } catch (error) {
    fs.unlinkSync(image.path);
    return res.status(500).json({ message: "Error uploading image" });
  }
};

export const parseProfileImage = multer({ storage: multerStorage }).single('profile_img');

export const createProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
  }
  const image = await uploadProfileImage(req.file, res);
  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      profile_img: image,
    }
  });

  res.status(200).json({ user });
});


export const getUserProfile = asyncHandler(async (req, res) => {
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
      friends: {
        select: {
          id: true,
        }
      },
      friendRequestsOf: {
        select: {
          id: true,
        }
      }
    }
  });

  if (user) {
    user.isFriend = user.friends.some(friend => friend.id === req.user.id);
    user.isRequested = user.friendRequestsOf.some(request => request.id === req.user.id);

    delete user.friends;
    delete user.friendRequestsOf;
  }


  res.status(200).json({ user });
});

export const addFriend = asyncHandler(async (req, res) => {
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

export const acceptFriendRequest = asyncHandler(async (req, res) => {
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
