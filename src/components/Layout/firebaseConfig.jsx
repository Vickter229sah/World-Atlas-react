import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHH1wx0J5qyoVj1KBobgVlzDLk6ZYAmPU",
    authDomain: "worldatlas-bf2fd.firebaseapp.com",
    projectId: "worldatlas-bf2fd",
    storageBucket: "worldatlas-bf2fd.firebasestorage.app",
    messagingSenderId: "464837897018",
    appId: "1:464837897018:web:1050b018c67db705de7e03",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
