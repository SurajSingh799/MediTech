
# MediTech Healthcare Management System

A modern **Healtcare Medical System (HMS)** built with an **Angular frontend** and **Node.js backend**  for managing patients, doctors, appointments, and medical records in a secure and scalable way.

---

## 🚀 Project Overview

**MediTech** is a healthcare platform designed to digitize and streamline hospital and clinic operations. It provides secure user authentication, role-based access, appointment management, and medical record handling through a centralized system.
It offers:
- ✅ Secure user authentication
- 🧑‍⚕️ Role-based access for Doctors, Patients, and Admins
- 📅 Appointment booking & management
- 📁 Medical record management
- 🅰️ Modern, responsive UI built with Angular
---

## 🛠️ Technology Stack

### Frontend
- Angular (v15+)
- Angular Material for UI components
- Angular Router
- HTTPClient for API communication

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JSON Web Tokens (JWT) for authentication  

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Angular CLI
- MongoDB (optional for production)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SurajSingh799/MediTech.git
   cd project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup (Angular)**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   Create .env file in backend/:
   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret


---

## ▶️ Running the Application

**Start Backend**
```bash
cd backend
node server.js
```

**Start Frontend (Angular)**
```bash
cd frontend
ng serve
```

**Access the App**
Visit: `http://localhost:4200`

---

## ✨ Features

### Authentication
- Login and registration
- JWT-based session handling
- Role-based route protection

### Patient Management
- Create, update, delete, and view patient profiles
- Search and filter functionality
- Secure access based on user roles

### Appointment Management
- Book appointments
- View upcoming and past appointments
- Doctor-wise appointment handling
  

### Dashboard
- Interactive dashboard with statistics
- Recent activity tracking
- System status overview



## 📁 Project Structure

```
project/
├── backend/                # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
|   ├── uploads/
│   └── server.js
│
└── front/       # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── layouts/
    │   │   ├── pages/
    │   │   └── services/
    │   └── main.ts
    └── angular.json
```

---

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgments

- Angular Material
- Node.js & Express
- MongoDB Atlas
- JWT Authentication

### ✅ Final Note

This project demonstrates a **real-world healthcare management workflow** with secure authentication, clean architecture, and scalable design.
- MongoDB Atlas
- JWT & Express
