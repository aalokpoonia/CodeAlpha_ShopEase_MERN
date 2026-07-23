# 🛍️ ShopEase — Full Stack MERN E-Commerce Application

ShopEase is a complete e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a full shopping experience — user authentication, product browsing, cart management, checkout, and order history — backed by a secure REST API.

## 🔗 Live Demo

- **Frontend:** [shopease-mern.netlify.app](https://shopease-mern.netlify.app)
- **Backend API:** [shopease-backend-n2b0.onrender.com](https://shopease-backend-n2b0.onrender.com)

> Note: Backend is hosted on Render's free tier — the first request after inactivity may take 30-50 seconds to respond.

## ✨ Features

- 🔐 User Registration & Login with JWT Authentication
- 🔒 Password hashing with bcrypt
- 🛒 Shopping Cart (add/remove items)
- 📦 Order placement and Order History
- 👤 User Profile page
- 🧭 Protected Routes for authenticated actions
- 📱 Responsive UI

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas, Mongoose
**Auth:** JWT, bcrypt
**Deployment:** Netlify (frontend), Render (backend)

## 📁 Folder Structure

ShopEase/
├── client/ -> React frontend
│ └── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ └── App.js
└── server/ -> Express backend
├── models/
├── routes/
└── server.js


## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT |
| GET | /api/products | Get all products |
| POST | /api/orders | Place a new order |
| GET | /api/orders/:userId | Get order history for a user |

## ⚙️ Running Locally

Clone the repo, then set up backend (npm install, add .env with MONGO_URI and JWT_SECRET, node server.js) and frontend (npm install, npm start) separately.

## 🚀 What I Learned

Building ShopEase involved working through real production challenges - securing environment variables after an accidental .env commit (rotated credentials, cleaned git history), configuring process.env.PORT for Render, connecting a deployed frontend to a live backend via environment variables, and debugging API routing issues end-to-end.

## 🔮 Future Improvements

- Payment gateway integration (Razorpay)
- Admin dashboard
- Product search & filters
- Wishlist
- Product reviews & ratings
- Image uploads

## 👤 Author

**Aalok Poonia**
[GitHub](https://github.com/aalokpoonia)
