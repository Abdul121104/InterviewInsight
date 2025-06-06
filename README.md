# InterviewInsight

A modern full-stack application built with React, TypeScript, and Node.js, featuring a beautiful UI powered by Shadcn and Tailwind CSS.
##  Live Demo

 [Click here to view the live app](https://interview-frontend-tedn.onrender.com/)

## Description

This project is a full-stack application that demonstrates modern web development practices. It features a responsive frontend built with React and TypeScript, and a robust backend powered by Node.js and Express.

### Key Features
- Modern, responsive UI with Shadcn components
- Type-safe development with TypeScript
- RESTful API architecture
- Authentication and authorization
- MongoDB database integration
- Google authentication support
- Rich text editing capabilities

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router DOM
- TipTap (Rich Text Editor)
- Radix UI Components
- Oauth
- JWT
- ByCrpt

### Backend
- Node.js
- Express
- TypeScript
- MongoDB Atlas
- JWT Authentication
- Google Auth
- CORS
- bcrypt

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interview
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create environment files:

Frontend (.env):
```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_API_KEY=Your api 
VITE_GOOGLE_CLIENT_ID=Your Id
```

Backend (.env):
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure
<img src="https://github.com/user-attachments/assets/048f95f3-fa66-46de-b755-e1a65ced67f2" width="500" height="1200" />



```
interview/
├── frontend/               # React frontend application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
└── backend/               # Node.js backend application
    ├── src/              # Source files
    └── package.json      # Backend dependencies
```


##  Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm i
```

## 🔒 Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL

### Backend
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👥 Authors

- Abdul Rahman - [GitHub](https://github.com/Abdul121104)

## Support

For support, email abdul.rahman121104@gmail.com or open an issue in the repository. 
