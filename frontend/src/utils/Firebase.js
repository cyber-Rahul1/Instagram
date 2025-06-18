import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "instagram-7a534.firebaseapp.com",
    projectId: "instagram-7a534",
    storageBucket: "instagram-7a534.firebasestorage.app",
    messagingSenderId: "1066367035750",
    appId: "1:1066367035750:web:5a27095ad870eea95dc0a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider }