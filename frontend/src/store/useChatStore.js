import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;
    
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
      await axiosInstance.put(`/messages/read/${userId}`);
      // Update users list to reset unread count for the selected user
      const currentUsers = get().users;
      const updatedUsers = currentUsers.map(user => {
        if (user._id === userId) {
          return {
            ...user,
            unreadCount: 0
          };
        }
        return user;
      });
      set({ users: updatedUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
      get().getUsers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, users } = get();
      let updatedUsers;

      // If a chat is selected
      if (selectedUser) {
        // If the message is from the selected user, add to messages and reset unread
        if (newMessage.senderId === selectedUser._id) {
          set({ messages: [...get().messages, newMessage] });
        }
        updatedUsers = users.map(user => {
          if (user._id === newMessage.senderId) {
            // If this is the selected user, reset unread
            if (user._id === selectedUser._id) {
              return {
                ...user,
                lastMessageTimestamp: newMessage.createdAt,
                unreadCount: 0
              };
            } else {
              // For other users, increment unread
              return {
                ...user,
                lastMessageTimestamp: newMessage.createdAt,
                unreadCount: (user.unreadCount || 0) + 1
              };
            }
          }
          return user;
        });
      } else {
        // No chat selected: increment only the sender's unread count
        updatedUsers = users.map(user => {
          if (user._id === newMessage.senderId) {
            return {
              ...user,
              lastMessageTimestamp: newMessage.createdAt,
              unreadCount: (user.unreadCount || 0) + 1
            };
          }
          return user;
        });
      }

      // Sort users by last message timestamp
      const sortedUsers = updatedUsers.sort(
        (a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
      );

      set({ users: sortedUsers });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    // If no user is selected, just clear the state
    if (!selectedUser) {
      set({ selectedUser: null, messages: [] });
      return;
    }

    // Reset unread count when selecting a user
    const currentUsers = get().users;
    const updatedUsers = currentUsers.map(user => {
      if (user._id === selectedUser._id) {
        return {
          ...user,
          unreadCount: 0
        };
      }
      return user;
    });

    set({ 
      selectedUser,
      users: updatedUsers,
      messages: []
    });

    get().getMessages(selectedUser._id);
  },
}));
