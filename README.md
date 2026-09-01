# MERN Chat App

A full-stack chat application built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Features

- User registration and login
- JWT-based authentication with cookies
- Real-time messaging using Socket.IO
- Chat stats and total user count
- Responsive chat UI

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Socket.IO-client
- Backend: Node.js, Express, MongoDB, Socket.IO
- Authentication: JWT + cookies

## Project Structure

```bash
chat-app/
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── Readme.md
```

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js (v18 or above recommended)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## 1) Clone and Install

```bash
git clone https://github.com/santosh-sarkar/chat-app.git
cd chat-app

cd backend
npm install

cd ../frontend
npm install
```

## 2) Environment Setup

Create your environment files by copying the example files:

### Backend

```bash
cd backend
copy .env.example .env
```

Then update the values in `.env`:

```env
PORT=5000
MONGO_URI=
NODE_ENV=development
JWT_SECRET=
CLIENT_URL=http://localhost:5173
```

`NODE_ENV` tells the app which environment it is running in.

- Use `development` while working locally
- Use `production` when deploying the backend
- This value is also used by cookie settings and other environment-based checks

### Frontend

```bash
cd frontend
copy .env.example .env
```

Then update the values in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 3) Run the App

### Start the backend

```bash
cd backend
npm run dev
```

The backend server should run on:

- http://localhost:5000

### Start the frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend should start on:

- http://localhost:5173

## 4) Default App Flow

- Open the frontend in the browser
- Register a new account or log in
- Start chatting in real time
- Messages are saved in MongoDB
- Socket.IO handles live chat updates 

## Environment Example Files

The project includes example environment files for both apps:

- backend/.env.example
- frontend/.env.example

## Common Notes

- Make sure MongoDB is running before starting the backend.
- If you are using MongoDB Atlas, replace `MONGO_URI` with your connection string.
- If the frontend cannot reach the backend, confirm the values in `frontend/.env` match the backend URL and port.

## Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## License

This project is for learning and demo purposes.
