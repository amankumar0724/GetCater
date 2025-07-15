# 🍱 GetCater – Traditional Catering Portal

## 🌐 Live Demo

🔗[View Live Site](https://get-cater.vercel.app)

**GetCater** is a mobile-friendly web platform built using **React**, **Firebase**, and **TailwindCSS**. It enables **rural catering service providers** to showcase and sell their homemade food products directly to customers. The system empowers local talents, supports cultural food diversity, and bridges the gap between rural businesses and the global market.

---

## 🧾 Problem Statement

Rural towns in India have immense potential in catering services, but lack a centralized platform to promote or sell their products. **GetCater** solves this by offering a portal where users can either:

- **Browse and purchase** catering items (as customers), or  
- **Upload and manage** their own food items (as caterers/admins)

This creates a two-way ecosystem where Indian tradition and entrepreneurship are digitally promoted.

---

## 👨‍💼 System Modules & Roles

### 👤 Admin (Caterers)
- Register/Login
- Upload & edit product details
- View all orders placed
- Track product analytics (future)

### 👥 User (Customers)
- Register/Login
- View all products
- Add to cart
- Place orders
- View order history
- Manage profile

---

## ⚙️ Tech Stack

| Layer             | Technology                          | Purpose                                       |
|------------------|--------------------------------------|-----------------------------------------------|
| **Frontend**      | [React.js](https://reactjs.org/)     | SPA architecture                              |
| **Styling**       | [TailwindCSS](https://tailwindcss.com/) | Fast, utility-first responsive design     |
| **Routing**       | [React Router](https://reactrouter.com/) | Navigation and role-based route protection |
| **Authentication**| [Firebase Auth](https://firebase.google.com/) | Secure login/register flows                |
| **Database**      | [Firebase Firestore](https://firebase.google.com/) | NoSQL product & order storage         |
| **Logging**       | JavaScript logging module            | Every action logged with context              |

---

## 🔍 Core Features

- 🔐 Role-based registration/login via Firebase Auth
- 📦 Product upload and storage (image, name, price, category)
- 🛒 Cart system with product quantity tracking
- 📑 Order placement and history
- 🖼️ Responsive design for mobile users
- 🧾 Basic profile management
- 📜 Action logging for transparency
- ☁️ Firebase-based real-time database updates

---

## 🧠 Solution Design (LLD Summary)

| Module            | Description                                                              |
|-------------------|---------------------------------------------------------------------------|
| Auth Module       | Firebase-based signup/login using email/password                         |
| Product Module    | Allows admin to upload, update, and delete food items                    |
| Cart Module       | Local or Firestore-based cart management                                 |
| Order Module      | Stores placed orders, customer ID, timestamps                            |
| Profile Module    | Allows users to update and view their own profile                        |
| Logging Utility   | Logs all interactions like product upload, order placement, profile edit |

<!-- 📄 Full LLD: `architecture/ll-document.pdf`
-->
---

## 🏗️ System Architecture

```plaintext
[React Frontend (Tailwind)]
     ↓
[Firebase Auth]
     ↓
[Role-based Routing]
     ↓
[Firestore DB]
     ↓
[JS Logging Utility]
