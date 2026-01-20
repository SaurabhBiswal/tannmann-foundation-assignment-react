# Tann Mann Foundation - Volunteer Registration Assignment

This repository contains the solution for the Frontend and Backend knowledge test for the Tann Mann Foundation assignment.

## Project Structure

The project is divided into two main parts:

-   **frontend/**: A React.js "Good Morning" page with a registration form and volunteer list.
-   **backend/**: A Node.js/Express REST API connecting to a local MySQL database.

## 🚀 Live Demo
**[View Live Application](https://tannmann-foundation-assignment-reac.vercel.app/)**

## Features

-   **Frontend**:
    -   "Good Morning" landing page.
    -   Glassmorphism UI design with modern aesthetics.
    -   Form to submit Name, Phone, and Email.
    -   Real-time list of registered users.
    -   Responsive design for mobile and desktop.
    
-   **Backend**:
    -   `POST /api/users`: Endpoint to save registration data.
    -   `GET /api/users`: Endpoint to retrieve registered volunteers.
    -   MySQL database integration.

## Setup Instructions

### Prerequisites
-   Node.js installed.
-   MySQL installed and running.

### 1. Database Setup
Create a MySQL database named `tannmann_foundation` and run the following SQL:

```sql
CREATE DATABASE tannmann_foundation;
USE tannmann_foundation;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configure .env if needed (default: root/Punpun@2002)
npm start
```
Server will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Application will open at `http://localhost:3000`.

## Tech Stack
-   **Frontend**: React, CSS3 (Variables, Flexbox/Grid), Axios.
-   **Backend**: Node.js, Express.js, MySQL2.
