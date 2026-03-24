<img width="1893" height="824" alt="Screenshot 2026-03-24 123528" src="https://github.com/user-attachments/assets/c35d14f5-2961-4ec7-8738-eb19f4705f7b" /># 🏨 Hotel Booking System

A full-stack hotel booking web application that allows users to search, book, and manage hotel rooms with integrated payments and authentication.

---

## 🚀 Live Demo

👉 Frontend: https://hotel-booking-frontend-phi-nine.vercel.app/
👉 Backend: https://hotel-booking-backend-production-6733.up.railway.app/

---

## 📂 Project Structure

This project is divided into separate repositories for better scalability and maintainability:

* 🔹 **Frontend (React App)**
  https://github.com/nisindunubasara/Hotel_booking_frontend

* 🔹 **Backend (Node.js API)**
  https://github.com/nisindunubasara/Hotel_booking_backend

---

## ✨ Features

### 👤 User Side

* User authentication using Clerk
* Search hotels by destination
* View room details and amenities
* Book rooms with date selection
* Stripe payment integration 💳
* Email confirmation system 📧
* View booking history

### 🏨 Hotel Owner Side

* Register hotel
* Add new rooms with images
* Manage room availability
* View bookings dashboard
* Track total revenue and bookings

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Services & Integrations

* Clerk (Authentication)
* Cloudinary (Image Uploads)
* Stripe (Payments)
* Brevo SMTP (Email Service)

---

## 📸 Screenshots

<img width="1896" height="826" alt="Screenshot 2026-03-24 123335" src="https://github.com/user-attachments/assets/c9ab6afa-1325-4ae4-b83f-a6ebe492d194" />
<img width="1893" height="819" alt="Screenshot 2026-03-24 123502" src="https://github.com/user-attachments/assets/14adc909-24e2-424d-9c7c-8e65f36d10ce" />
<img width="1893" height="824" alt="Screenshot 2026-03-24 123528" src="https://github.com/user-attachments/assets/08f6cf8b-dadf-49bc-ad41-9bd6f1e7eace" />
<img width="1896" height="821" alt="Screenshot 2026-03-24 123648" src="https://github.com/user-attachments/assets/2721d308-844c-4bb8-b0d7-0e44b4a52a6b" />

## ⚙️ Setup Instructions

### 1. Clone Main Repo

```bash
git clone https://github.com/nisindunubasara/Hotel_booking.git
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
npm install
npm start
```

---

## 🔐 Environment Variables

### Backend (.env)

```
MONGODB_URI=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_USER=
SMTP_PASS=
```

### Frontend (.env)

```
VITE_BACKEND_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY=$
```

---

## 📌 Key Functionalities

* 🔍 Smart hotel search system
* 📅 Real-time availability checking
* 💳 Secure Stripe payment system
* 📧 Automated email notifications
* 📊 Owner analytics dashboard

---

## 👨‍💻 Author

**Nisindu Nubasara**
🎓 University of Kelaniya
💻 Electronic and Computer Science Undergraduate

---

## ⭐ Project Status

✅ Fully Functional
🚀 Production Ready
💡 Continuously Improving

---
