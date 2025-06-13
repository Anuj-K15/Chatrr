import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "aditya.bose@example.com",
    fullName: "Aditya Bose",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "sakshi.mehta@example.com",
    fullName: "Sakshi Mehta",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "tanya.das@example.com",
    fullName: "Tanya Das",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "vivaan.singh@example.com",
    fullName: "Vivaan Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "shruti.rao@example.com",
    fullName: "Shruti Rao",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "riya.sen@example.com",
    fullName: "Riya Sen",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "ravi.menon@example.com",
    fullName: "Ravi Menon",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "ananya.verma@example.com",
    fullName: "Ananya Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "krishna.nair@example.com",
    fullName: "Krishna Nair",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullName: "Isha Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "rahul.kumar@example.com",
    fullName: "Rahul Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "siddharth.chopra@example.com",
    fullName: "Siddharth Chopra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "arjun.reddy@example.com",
    fullName: "Arjun Reddy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "neha.jain@example.com",
    fullName: "Neha Jain",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "priya.sharma@example.com",
    fullName: "Priya Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
