<<<<<<< HEAD
=======
# TravelPlanner

## Overview
TravelPlanner is a full-stack web application that allows users to create and manage travel itineraries. It includes user authentication, itinerary management, and a REST API for seamless frontend-backend communication.

## Features
- **User Authentication** (Register, Login, JWT-based authentication)
- **Itinerary Management** (Create, View, Edit, Delete itineraries)
- **Frontend**: React.js with Axios for API calls
- **Backend**: Spring Boot with MySQL and JWT authentication

---

# 🛠️ Setup Guide

## Prerequisites
Before running the project, ensure you have the following installed:
- **Java 21+** (Backend)
- **Node.js 18+** and **npm** (Frontend)
- **MySQL 8+** (Database)
- **Git** (Version control)
- **Postman** (For API testing, optional)

---

# 🚀 Running the Application

## 1️⃣ Backend Setup (Spring Boot)
### **Step 1: Configure the Database**
- Start MySQL and create a new database:
  ```sql
  CREATE DATABASE travel_planner;

Configure application.properties (in backend/src/main/resources/

spring.datasource.url=jdbc:mysql://localhost:3306/travel_planner
spring.datasource.username=root
spring.datasource.password=yourpassword

## 2️⃣ Run Backend
mvn spring-boot:run #Windows

The backend should now be running at http://localhost:8080/api

## 1️⃣ Frontend Setup (React)
### **Step 1: Install Dependencies**
npm install

### **Step 2: Configure API URL**
REACT_APP_API_URL=http://localhost:8080/api
npm start

The React app should be running at http://localhost:3000

📡 API Endpoints (Postman Testing)
## Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT token |
| `GET`  | `/api/auth/verify?email=test@example.com` | Verify email |


## Backend Expectations (Assumed)
GET /api/profile → returns { profilePicture, interests, aboutMe }

PUT /api/profile → accepts { interests, aboutMe }

POST /api/profile/upload-picture → returns { profilePictureUrl } after receiving FormData

## Itineraries
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET`  | `/api/itineraries` | Fetch all itineraries |
| `POST` | `/api/itineraries` | Create a new itinerary |
| `PUT`  | `/api/itineraries/{id}` | Update an itinerary |
| `DELETE` | `/api/itineraries/{id}` | Delete an itinerary |
>>>>>>> 5556ce3 (Web App Updates)
