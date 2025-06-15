
# MediTech Healthcare Blockchain DMS

A modern **Digital Medical System (DMS)** built with an **Angular frontend** and **Node.js backend**, leveraging **blockchain technology** and **IPFS** for secure and decentralized patient record management.

---

## 🚀 Project Overview

**MediTech** is a healthcare platform that ensures secure, transparent, and decentralized storage of patient medical records using Ethereum blockchain and IPFS. It offers:

-✅ Secure user authentication  
-📁 Blockchain-verified patient records  
-🌐 IPFS-based distributed storage  
-🅰️ Modern, responsive UI built with Angular  
-🛡️Role-based access for Doctors, Patients, and Admins

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
- Ethereum (Sepolia Testnet) for blockchain integration  
- IPFS (via Pinata) for decentralized storage  

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Angular CLI
- MongoDB (optional for production)
- Metamask (for blockchain interactions)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup (Angular)**
   ```bash
   cd ../front
   npm install
   ```

4. **Environment Setup**
   - Create `.env` files in both `backend/` and `frontend-angular/` using the examples provided:
     - `backend/.env.example`
     - `frontend-angular/.env.example`

---

## ▶️ Running the Application

**Start Backend**
```bash
cd backend
npm run dev
```

**Start Frontend (Angular)**
```bash
cd front
ng serve
```

**Access the App**
Visit: `http://localhost:4200`

---

## ✨ Features

### Authentication
- Login and registration
- JWT-based session handling
- Role-based dashboard redirection

### Patient Management
- Create, update, delete, and view patient profiles
- Filter and search capabilities
- Secure, verifiable medical records

### Medical Records
- Files stored on IPFS
- Record hashes stored on Ethereum
- Permission-based access for different roles

### Dashboard
- Interactive dashboard with statistics and activity logs
- Quick links to key features



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
- Ethereum (Sepolia)
- IPFS / Pinata
- MongoDB Atlas
- JWT & Express
