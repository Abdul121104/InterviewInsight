# Full-Stack Interview Platform

A scalable and secure full-stack web application designed for interview preparation and productivity. Built using modern technologies such as React, TypeScript, Node.js, and MongoDB. The platform features a rich UI, robust authentication, and real-time editing capabilities.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [Author](#author)
- [Support](#support)

---

## Overview

This project serves as a comprehensive platform for users to prepare for interviews. It allows users to create, edit, and manage interview preparation notes. Additionally, it includes AI-powered assistance and secure login mechanisms to ensure a personalized and seamless experience.

---

## Key Features

- Fully responsive frontend with Tailwind CSS and Shadcn UI components
- Type-safe development using TypeScript on both frontend and backend
- RESTful API architecture using Express.js
- Secure authentication using JWT and Google OAuth 2.0
- Rich text editing capabilities using TipTap
- Integration with Gemini API for AI-based assistance
- MongoDB integration with Mongoose for data persistence
- Modular folder structure with clean separation of concerns

---

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router DOM
- TipTap (Rich Text Editor)
- Radix UI Components

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Google OAuth 2.0
- CORS
- bcryptjs

---

## Prerequisites

Before starting the project, ensure the following tools are installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (either local instance or MongoDB Atlas)

---

## Installation

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
FRONTEND_URI=
```

## 🚀 Running the Application

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

## 📁 Project Structure

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👥 Authors

- Abdul Rahman - [GitHub](https://github.com/Abdul121104)

## 📞 Support

For support, email abdul.rahman121104@gmail.com or open an issue in the repository. 