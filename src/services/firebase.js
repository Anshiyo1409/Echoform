// ECHOFORM Firebase Integration Helper
// Modular service template for Firestore & Firebase Auth

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "echoform.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "echoform-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "echoform.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000"
};

export const isFirebaseConfigured = () => {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
};
