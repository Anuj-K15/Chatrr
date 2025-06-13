import { Server } from "socket.io";
import http from "http";
import express from "express";
import { userInfo } from "os";

const app = express();
const server = http.createServer(app);

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  // used to store online users
  const userSocketMap = {}; // {userId: socketId}

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle marking messages as read
    socket.on("markMessagesAsRead", async ({ senderId, receiverId }) => {
      try {
        const Message = (await import("../models/message.model.js")).default;
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
        // Notify the sender that their messages were read
        const senderSocketId = userSocketMap[senderId];
        if (senderSocketId) {
          io.to(senderSocketId).emit("messagesRead", { receiverId });
        }
      } catch (error) {
        console.log("Error in markMessagesAsRead socket:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getRecieverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { io, app, server };
