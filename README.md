# 📚 BookPoint – Online Book Selling Platform

🔗 **Live Website:**  
https://bookpoint-9977c.web.app/

---

## 📖 Project Overview

**BookPoint** is a full-stack online book selling web application where users can browse books, view details, add books to cart, manage quantities, and place orders.  
The platform supports user authentication, role-based users, category-wise book browsing, and a responsive modern UI.

This project is built using **React, Node.js, Express, MongoDB**, and **Firebase Authentication**.

---

## 🚀 Features

### 👤 User Features
- User registration & login (Email/Password + Google)
- Browse all books
- View book details
- Browse books by category
- Add books to cart
- Increase / decrease quantity per book
- Remove books from cart
- View cart summary (total items & price)
- Proceed to order page
- Fully responsive for mobile, tablet, and desktop

### 📚 Book Management
- Books stored in MongoDB
- Category-based book filtering
- Popular books section (rating-based)
- Pagination for large book lists

### 🛒 Cart System
- Cart is **user-specific**
- Same book increases quantity instead of duplicating
- Quantity updates reflect total price
- Cart data stored securely in database

### 🔐 Authentication
- Firebase Authentication
- Google login support
- New users saved in database with default role: `user`

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- React Hook Form
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- CORS
- Dotenv

### Authentication
- Firebase Authentication

### Deployment
- **Frontend:** Firebase Hosting  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 🗂️ Database Collections

### 📘 books
```json
{
  "_id": "ObjectId",
  "name": "Book Name",
  "author": "Author Name",
  "price": 250,
  "category": "Programming",
  "details": "Book description",
  "cover": "Image URL",
  "rating": {
    "average": 4.5,
    "count": 120
  },
  "stock": 10
}
