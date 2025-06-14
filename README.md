# Chatrr 💬

A modern real-time chat application built with React, Node.js, and Socket.IO.

# Live on: 

https://chatrr-k2vh.onrender.com

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## Description

Chatrr is a real-time chat application that allows users to communicate instantly. Built with modern web technologies, it provides a seamless and responsive chat experience.

### Features

- Real-time messaging using Socket.IO
- Modern UI with Tailwind CSS
- Responsive design for all devices
- User authentication
- Message history
- Online status indicators
- Typing indicators

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Vite
- Socket.IO Client

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Anuj-K15/Chatrr.git
cd Chatrr
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Socket.IO Configuration
SOCKET_CORS_ORIGIN=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start both frontend and backend development servers:
```bash
# Start backend server (from backend directory)
cd backend
npm run dev

# Start frontend server (from frontend directory)
cd frontend
npm run dev
```

The backend will run on `http://localhost:5001` and the frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Create an account or log in
3. Start chatting!

## Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Check the existing issues for similar problems
- Contact the maintainers

## Roadmap

- [ ] Add file sharing capabilities
- [ ] Implement group chat functionality
- [ ] Add message reactions
- [ ] Implement end-to-end encryption
- [ ] Add voice and video call features

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Project Status

📊 Current Status: In Development

### Development Progress
- ✅ Basic chat functionality implemented
- ✅ User authentication system
- ✅ Real-time messaging
- 🚧 UI/UX improvements in progress
- 🚧 Performance optimizations
- 📅 Upcoming features planned

### Maintenance
This project is actively maintained. We regularly:
- Review and merge pull requests
- Address reported issues
- Update dependencies
- Implement new features

Feel free to contribute or report any issues you encounter!

## Authors

- Anuj-K15 - Initial work

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
