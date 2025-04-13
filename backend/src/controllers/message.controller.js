import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  const currUserId = req.user._id;
  const allUsers = await User.find({ _id: { $ne: currUserId } }).select(
    "-password"
  );
  res.status(200).json(allUsers);
};

export const getMessages = async (req, res) => {
  const { id: othersId } = req.params;
  const myId = req.user._id;

  const messages = await User.find({
    $or: [
      { senderId: myId, receiverId: othersId },
      { senderId: othersId, receiverId: myId },
    ],
  });

  res.status(200).json(messages);
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: othersId } = req.params;
  const myId = req.user._id;

  let imageUrl;
  if (image) {
    const response = await cloudinary.uploader.upload(image);
    imageUrl = response.secure_url;
  }

  const message = new Message({
    senderId: myId,
    receiverId: othersId,
    text,
    image: imageUrl,
  });

  await message.save();

  // real time chat functionality will be build here using socket.io

  res.status(201).json(messages);
};
