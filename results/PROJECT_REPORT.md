# Project Report: User Authentication System

## Executive Summary
This project implements a secure user authentication system with a modern mobile frontend and robust backend API. The system provides user registration and login functionality with secure password handling and user profile management.

## 1. Project Overview

### 1.1 Project Description
The project consists of a full-stack application with:
- A React Native mobile application (frontend)
- A Flask-based REST API (backend)
- PostgreSQL database for data persistence

### 1.2 Project Goals
- Implement secure user authentication
- Create a responsive and user-friendly mobile interface
- Ensure data security and privacy
- Provide a scalable and maintainable codebase

## 2. Technical Architecture

### 2.1 Frontend (React Native)
- Built using Expo framework
- Key technologies:
  - React Native 0.79.2
  - Expo SDK 53.0.9
  - TypeScript for type safety
  - React Navigation for routing
  - Various UI components from React Native Elements

### 2.2 Backend (Flask)
- Python-based REST API
- Key features:
  - User registration and authentication
  - Secure password hashing using bcrypt
  - CORS support for cross-origin requests
  - PostgreSQL database integration
  - Error handling and logging

### 2.3 Database
- PostgreSQL hosted on Neon Tech
- Schema includes:
  - User table with fields for:
    - Email (unique)
    - Password (hashed)
    - First name
    - Last name
    - Gender
    - Age
    - Nationality
    - Creation timestamp

## 3. Features and Functionality

### 3.1 User Authentication
- Secure user registration with:
  - Email validation
  - Password hashing
  - Duplicate user prevention
- Login system with:
  - Credential verification
  - Secure session management
  - User profile data return

### 3.2 Security Measures
- Password hashing using bcrypt
- CORS protection
- Input validation
- Secure database connections
- Error handling and logging

## 4. Technical Implementation

### 4.1 API Endpoints
1. `/signup` (POST)
   - Handles new user registration
   - Validates input data
   - Creates user record in database

2. `/login` (POST)
   - Authenticates user credentials
   - Returns user profile data
   - Implements secure session management

### 4.2 Database Schema
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    age INTEGER,
    nationality VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 5. Development and Deployment

### 5.1 Development Environment
- Frontend: Expo development environment
- Backend: Python virtual environment
- Database: Neon Tech PostgreSQL

### 5.2 Dependencies
#### Frontend Dependencies
- React Native and Expo core packages
- Navigation and UI components
- TypeScript for type safety
- Various utility libraries

#### Backend Dependencies
- Flask and Flask-CORS
- psycopg2 for PostgreSQL
- bcrypt for password hashing

## 6. Future Enhancements

### 6.1 Planned Features
- Password reset functionality
- Email verification
- Social media authentication
- Enhanced user profile management
- Two-factor authentication

### 6.2 Scalability Improvements
- Implement caching
- Add rate limiting
- Enhance error handling
- Improve logging and monitoring

## 7. Conclusion
The project successfully implements a secure and scalable user authentication system. The combination of React Native for the frontend and Flask for the backend provides a robust foundation for future enhancements and scalability.

## 8. Appendix

### 8.1 API Documentation
Detailed API documentation is available in the `backend/api.txt` file.

### 8.2 Setup Instructions
1. Frontend Setup:
   ```bash
   cd my-app
   npm install
   npm start
   ```

2. Backend Setup:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r req.txt
   python app.py
   ```

### 8.3 Environment Variables
- Database connection string
- API keys (if applicable)
- Environment-specific configurations 