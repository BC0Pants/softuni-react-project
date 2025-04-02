# EngiSpace - Engineering Communication Platform

EngiSpace is a dedicated platform designed to facilitate seamless communication and collaboration between engineers. Built with React and Node.js, it provides a specialized space where engineers can connect, share knowledge, and work together on projects with fellow professionals in the field.

## 🚀 Features

- Modern React-based frontend with Vite
- Secure Node.js/Express backend
- MongoDB database integration
- User authentication and authorization
- Real-time communication between engineers
- Project collaboration tools
- Image upload functionality via Imgur
- Responsive design with Tailwind CSS
- Professional networking capabilities

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/engispace.git
cd engispace
```

2. Install frontend dependencies:
```bash
cd client/EngiSpace
npm install
```

3. Install backend dependencies:
```bash
cd ../../server
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```env
PORT=8080
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client/EngiSpace
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📁 Project Structure

```
engispace/
├── client/
│   └── EngiSpace/          # React frontend application
│       ├── src/           # Source files
│       ├── public/        # Static files
│       └── package.json   # Frontend dependencies
└── server/
    ├── src/              # Backend source files
    │   ├── routes/       # API routes
    │   ├── models/       # Database models
    │   └── index.js      # Server entry point
    └── package.json      # Backend dependencies
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Secure cookie handling
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- Trayan Parushev Vasilev - Initial work

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- MongoDB team for the powerful database