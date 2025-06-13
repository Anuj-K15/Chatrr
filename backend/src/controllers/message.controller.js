import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, getIO } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    
    // Get all users except the logged-in user
    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Get the last message timestamp and unread count for each user
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: user._id },
            { senderId: user._id, receiverId: loggedInUserId },
          ],
        }).sort({ createdAt: -1 });

        // Get unread message count
        const unreadCount = await Message.countDocuments({
          senderId: user._id,
          receiverId: loggedInUserId,
          read: false,
        });

        return {
          ...user.toObject(),
          lastMessageTimestamp: lastMessage ? lastMessage.createdAt : new Date(0),
          unreadCount,
        };
      })
    );

    // Sort users by last message timestamp (most recent first)
    const sortedUsers = usersWithLastMessage.sort(
      (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp
    );

    res.status(200).json(sortedUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages Controller:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Get the receiver's socket id
    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      // Send the message to the receiver
      getIO().to(receiverSocketId).emit("newMessage", newMessage);
      
      // Update the receiver's user list
      getIO().to(receiverSocketId).emit("updateUserList");
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage Controller:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    const receiverId = req.user._id;

    await Message.updateMany(
      {
        senderId,
        receiverId,
        read: false,
      },
      {
        $set: { read: true },
      }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.log("Error in markMessagesAsRead:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
