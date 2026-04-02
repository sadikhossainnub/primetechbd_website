# Firebase Configuration Guide

## Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on Web icon (</>) to add a web app
6. Copy the configuration object

## Update Firebase Config

Open `src/firebase.js` and replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Start in **Production Mode** (we'll set rules later)
4. Choose your preferred location (asia-south1 for Bangladesh)

## Firestore Security Rules

After setup, update your Firestore rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to quote_requests for authenticated users
    match /quote_requests/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Allow read/write to contact_messages for authenticated users
    match /contact_messages/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Enable Authentication

1. Go to **Authentication** in Firebase Console
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Add your admin user manually from the Users tab

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env` file in project root
2. Add Firebase config:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Update `src/firebase.js` to use env variables:
```javascript
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // ... etc
};
```

## Collections Structure

### quote_requests
- name (string)
- company (string)
- email (string)
- service (string)
- modules (array)
- totalPrice (number)
- budget (string)
- notes (string)
- timestamp (timestamp)
- status (string) - "new", "contacted", "qualified", "pending"

### contact_messages
- name (string)
- email (string)
- message (string)
- timestamp (timestamp)
- status (string) - "unread", "read", "replied"
