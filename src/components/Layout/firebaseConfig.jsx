import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHH1wx0J5qyoVj1KBobgVlzDLk6ZYAmPU",
  authDomain: "worldatlas-bf2fd.firebaseapp.com",
  projectId: "worldatlas-bf2fd",
  storageBucket: "worldatlas-bf2fd.appspot.com",
  messagingSenderId: "464837897018",
  appId: "1:464837897018:web:1050b018c67db705de7e03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
