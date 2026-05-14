# 🖼️ Appwrite-Gallery (Practice + Learning Project) ☁️

A **frontend-based image gallery application** built using **HTML**, **CSS**, **JavaScript**, and **Appwrite Cloud** that allows users to **register**, **log in**, **upload images to cloud storage**, **and view their personal gallery**.

This project is designed as a **learning-focused cloud integration lab**, helping developers understand how frontend applications interact with **Backend-as-a-Service (BaaS)** platforms like Appwrite.
This project intentionally avoids frameworks to focus on core frontend + BaaS concepts.
It focuses on:

- Authentication workflows
- Cloud storage handling
- Database-driven UI rendering
- Session-based access control
- Secure, user-isolated data access

---

## 🧱 Project Structure

```bash
appwrite-gallery/
│
├── index.html              # Login / Register page
├── dashboard.html          # User dashboard
├── gallery.html            # Upload & view images
├── success.html            # Success page
│
├── css/
│   └── index.css           # Global styles
│
├── js/
│   └── app.js              # All Appwrite logic
│
├── README.md               # Project documentation
└── .gitignore

```

---

## ✨ Features

### 🔐 User Authentication

- Email & password based registration
- Secure login using Appwrite sessions
- Session validation on protected pages
- Logout functionality

### ☁️ Cloud Image Upload

- Upload images directly to Appwrite Storage
- Each image stored with a unique ID
- Title metadata attached to every upload

### 🗂️ Personal Image Gallery

- Fetches images per logged-in user
- Displays images dynamically from cloud storage
- Ensures user data isolation (users see only their own images)

### 🔒 Protected Routes

- Dashboard and gallery pages are inaccessible without login
- Automatic redirect for unauthorized access

### 🧪 Learning-Oriented Design

- Single `app.js` as source of truth
- No frameworks — pure frontend logic
- Clear separation of UI and cloud logic
- Easy to read, modify, and extend

---

## 🛠 Technologies Used

| Technology       | Role                              |
| ---------------- | --------------------------------- |
| **HTML5**        | Page structure                    |
| **CSS3**         | Styling and layout                |
| **JavaScript**   | Client-side logic                 |
| **Appwrite**     | Authentication, Database, Storage |
| **Appwrite SDK** | Frontend cloud interaction        |

---

## 📌 Requirements

- A modern web browser
- An **Appwrite Cloud project** (or self-hosted Appwrite)

> No build tools, frameworks, or servers are required.

---

## ▶️ How to Use (Local)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ShakalBhau0001/appwrite-gallery.git
```

### 2️⃣ Open the project

Simply open `index.html` in your browser
( use **Live Server** if preferred).

### 3️⃣ Configure Appwrite (Required)

> ⚠️ Appwrite project IDs and credentials are **intentionally removed** from this repository.

To run the project:

- Open `app.js`
- Replace placeholder values with **your own Appwrite project details**

```js
.setEndpoint("YOUR_APPWRITE_ENDPOINT")
.setProject("YOUR_PROJECT_ID");

const DATABASE_ID = "YOUR_DATABASE_ID";
const TABLE_ID = "YOUR_COLLECTION_ID";
const BUCKET_ID = "YOUR_BUCKET_ID";
```

---

## ⚙️ How It Works

### 1️⃣ Authentication

- Users register and log in using Appwrite Account APIs
- Active sessions are used to protect routes

### 2️⃣ Image Upload

- Selected image is uploaded to Appwrite Storage
- Metadata (title, image ID, user ID) is stored in Appwrite Database

### 3️⃣ Gallery Rendering

- Database is queried using the logged-in user ID
- Images are fetched securely from storage
- Gallery UI is rendered dynamically

---

## ⚠️ Limitations

- Frontend-only project (no backend server)
- Appwrite IDs must be manually configured
- No image deletion or editing (yet)
- Styling kept intentionally minimal

---

## 🌟 Future Enhancements

- Image delete & update options
- Pagination or lazy loading
- Image preview modal
- Drag & drop upload
- Role-based access (admin / user)

---

## ⚠️ Disclaimer

This project is created **strictly for educational and learning purposes**.

It demonstrates **cloud integration concepts and frontend-to-BaaS communication**.
It is **not intended for production use** without additional security hardening.

---

## 🪪 Author

> **Creator: Shakal Bhau**

> **GitHub: [ShakalBhau0001](https://github.com/ShakalBhau0001)**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---
