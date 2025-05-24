# AI-Based Health Consultant System

## 🧠 Executive Summary
This project is a full-stack AI-driven mobile application that provides personalized health consultations. It includes secure user authentication and utilizes the **Deep Seek API** to generate AI-based health advice. The frontend is built using **React Native**, and the backend uses **Python (Flask)** with **PostgreSQL** for data storage.

---

## 🔍 Project Overview

### 1.1 Description
- **Frontend:** React Native (Expo) mobile app
- **Backend:** Flask REST API for signup/login
- **AI Integration:** Deep Seek API for generating health recommendations
- **Database:** PostgreSQL for storing user and query data

### 1.2 Goals
- Secure user authentication
- AI-based personalized health advice
- User-friendly mobile interface
- Ensure privacy and security of user data

---

## 🛠️ Technical Architecture

### 2.1 Frontend (React Native)
- **Tech Stack:**
  - React Native, Expo SDK
  - TypeScript
  - React Navigation
  - Axios (API requests)
- **Features:**
  - Health concern input
  - Integration with Deep Seek API

### 2.2 Backend (Python + Flask)
- **Responsibilities:**
  - Signup/Login APIs
  - Password hashing with `bcrypt`
  - Session management using JWT
  - PostgreSQL integration via `psycopg2`

### 2.3 AI Integration (Deep Seek API)
- Communicates directly from frontend
- Returns personalized advice based on health inputs

### 2.4 Database (PostgreSQL)
- **Tables:**
  - `Users`: stores user info (hashed passwords, emails, etc.)
  - `HealthConcerns`: stores user queries and AI responses

---

## ✨ Features and Functionality

### 3.1 User Authentication
- Signup with email and password (hashed)
- JWT-based login authentication

### 3.2 AI Health Advice
- Submit health concerns via app
- Get real-time, tailored health recommendations via Deep Seek

### 3.3 Security & Privacy
- Passwords hashed with bcrypt
- JWT for session management
- Encrypted health data

---

## 🔧 Technical Implementation

### 4.1 API Endpoints
- `POST /signup`: Register user and store hashed password
- `POST /login`: Authenticate user and return token

### 4.2 Deep Seek Integration
- Handled in frontend using Axios
- Sends user health input to Deep Seek and displays results

---

## 🚀 Development and Deployment

### 5.1 Environments
- **Frontend:** Expo, React Native
- **Backend:** Flask (Python)
- **Database:** PostgreSQL (Neon Tech)

### 5.2 Dependencies

**Frontend:**
- Expo
- TypeScript
- Axios
- React Navigation

**Backend:**
- Flask
- psycopg2
- bcrypt

---

## 📊 Results and Performance

### 6.1 Testing
- Unit tests for backend authentication and API handling

### 6.2 Performance
- Response Time: ~2-3 seconds per health query
- Load Tested for 1000 concurrent users

---

## ✅ Conclusion
The AI-Based Health Consultant app securely authenticates users and provides real-time, personalized health guidance via the Deep Seek API. The integration of React Native and Flask ensures performance and usability across platforms.

---

## 🧾 Appendix

### 8.1 Setup Instructions

**Frontend Setup:**
```bash
cd my-app
npm install
npm start

**backend Setup:**
cd backend
python -m venv venv
# For Windows
venv\Scripts\activate
pip install -r requirements.txt
python app.py

