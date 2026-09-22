# Doctor Finder

A full-stack web application for finding and booking doctors online.

## Project Structure

### Client (React + Vite)
- **Frontend**: React with Redux for state management
- **Routing**: React Router for navigation
- **API Client**: Axios for HTTP requests
- **Location**: `client/`

### Server (Node.js + Express)
- **Backend**: Express.js server
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **File Upload**: Cloudinary
- **Location**: `server/`

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
npm run dev
```

## Environment Variables

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctor-finder
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Features

- User authentication with OTP
- Doctor search and filtering
- Appointment booking
- Admin dashboard
- Doctor management
- Patient management
- Review and rating system

## License
MIT
