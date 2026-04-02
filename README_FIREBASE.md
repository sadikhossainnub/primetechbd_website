# Prime Technology Solutions - Firebase Integration Complete ✅

Firebase has been successfully integrated into your website! Here's what's been set up:

## 🎯 Features Implemented

### 1. **Quote Request System**
- All quote requests from `/request` page are now saved to Firebase Firestore
- Data includes: customer info, selected service, modules, pricing, and timestamp
- Collection: `quote_requests`

### 2. **Contact Form**
- Contact messages from homepage are saved to Firestore
- Collection: `contact_messages`

### 3. **Admin Panel** (Ready for Firebase Auth)
- Login page at `/admin/login`
- Dashboard at `/admin/dashboard`
- Currently using mock auth (username: `admin`, password: `prime123`)

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it "Prime Tech Solutions"
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Get Configuration
1. In Firebase Console, click the **Web icon** (</>)
2. Register app name: "Prime Tech Website"
3. **Copy the firebaseConfig object**

### Step 3: Update Config File
Open `src/firebase.js` and replace with your config:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",  // Your actual values here
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Step 4: Enable Firestore
1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Create Database"**
3. Select **"Start in production mode"**
4. Choose location: **asia-south1** (Mumbai - closest to Bangladesh)
5. Click "Enable"

### Step 5: Set Security Rules
In Firestore, go to **"Rules"** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quote_requests/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /contact_messages/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

Click **"Publish"**

## 📊 Data Structure

### quote_requests Collection
```json
{
  "name": "John Doe",
  "company": "ABC Ltd",
  "email": "john@abc.com",
  "service": "erp",
  "serviceName": "ERP Solution",
  "modules": [
    { "id": "accounting", "name": "Accounting", "price": 25000 }
  ],
  "totalPrice": 25000,
  "budget": "2,00,000 - 5,00,000 TK",
  "notes": "Need ASAP",
  "timestamp": "2024-01-25T10:30:00Z",
  "status": "new"
}
```

### contact_messages Collection
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Interested in your services",
  "timestamp": "2024-01-25T10:30:00Z",
  "status": "unread"
}
```

## 🔐 Optional: Enable Email Authentication (For Admin)

1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Go to **Users** tab
4. Click **"Add User"**
5. Enter your admin email and password
6. Save

## ✅ Testing

1. Run your dev server: `npm run dev`
2. Go to `/request` and submit a quote
3. Check Firebase Console → Firestore Database
4. You should see the data in `quote_requests` collection!

## 📱 Next Steps (Optional)

- Set up Firebase Hosting for deployment
- Add real-time listeners to admin dashboard
- Implement email notifications using Firebase Functions
- Add Firebase Analytics

## 🆘 Troubleshooting

**Error: "Firebase not initialized"**
- Make sure you've updated `src/firebase.js` with your actual config

**Error: "Permission denied"**
- Check Firestore security rules are set correctly

**Data not showing in Firebase**
- Open browser console (F12) and check for errors
- Verify your internet connection

---

Need help? Contact: info@primetechbd.xyz
