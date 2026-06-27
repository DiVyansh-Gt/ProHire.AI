
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "prohire-48722.firebaseapp.com",
  projectId: "prohire-48722",
  storageBucket: "prohire-48722.firebasestorage.app",
  messagingSenderId: "293250110855",
  appId: "1:293250110855:web:08c190606aa55ab88d2f22"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}