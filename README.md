# 🐄 QurbaniHat - Livestock Booking Platform

Welcome to **QurbaniHat**, a modern, responsive, and user-friendly livestock booking platform tailored for the Qurbani season. Built with Next.js, Tailwind CSS, and Better Auth with MongoDB, this application provides a seamless experience for browsing, sorting, and booking animals online.

🌍 **Live Website:** [QurbaniHat Live Link](https://programminghero-a8-qurbani-hat.vercel.app/)

---

## ✨ Key Features

*   **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop screens using Tailwind CSS.
*   **Dynamic Data Fetching:** Animals data is fetched dynamically with built-in loading skeleton states.
*   **Price Sorting:** Users can sort animals by price (Low to High / High to Low).
*   **Authentication System:** Secure Login and Registration via **Better Auth** (Email/Password & Google Sign-in).
*   **Database Integration:** Persistent data storage using **MongoDB Atlas**.
*   **Private Routes:** The "Details & Booking" page is protected and requires user authentication.
*   **Seamless Booking:** Auto-fills user details (Name, Email) into the booking form. Shows success toast messages upon booking.
*   **Profile Management:** Users can view and update their profile information (Name & Profile Picture URL) instantly.
*   **Custom 404 Page:** A beautifully designed "Not Found" page for invalid routes.

---

## 🛠️ Technologies Used

*   **Frontend:** Next.js (App Router), React.js
*   **Styling:** Tailwind CSS, Animate.css
*   **Icons & Alerts:** React Icons, React Hot Toast
*   **Authentication:** Better Auth
*   **Database:** MongoDB Atlas
*   **Deployment:** Vercel

---

## 🚀 Run the Project Locally

If you want to run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/mdsadrulhasandider/programminghero-a8-qurbani-hat.git
cd programminghero-a8-qurbani-hat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your configuration:
```env
BETTER_AUTH_SECRET="your_secret_here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
MONGODB_URI="your_mongodb_atlas_uri"
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---
*Designed & Developed as part of a Programming Hero Assignment.*
