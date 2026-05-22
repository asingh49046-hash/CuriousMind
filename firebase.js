import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD11Mi6wgkVmKol4-P37yMAJjA1ZNprZgs",
  authDomain: "curiousmind-4d121.firebaseapp.com",
  projectId: "curiousmind-4d121",
  storageBucket: "curiousmind-4d121.firebasestorage.app",
  messagingSenderId: "604073934827",
  appId: "1:604073934827:web:406842868c61680251e3ae",
  measurementId: "G-LWM5SGL2QK"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {

  db,
  auth,

  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,

  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut

};