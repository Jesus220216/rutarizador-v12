import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// 🔥 TU CONFIG REAL
const firebaseConfig = {
  apiKey: "AIzaSyD1w_66STxqf5iMVneB8DgLnpFwS8RGy3g",
  authDomain: "rutarizador-v12.firebaseapp.com",
  projectId: "rutarizador-v12",
  storageBucket: "rutarizador-v12.firebasestorage.app",
  messagingSenderId: "928870753252",
  appId: "1:928870753252:web:f57cb32567e1a1138b1df1"
};

// 🚀 INICIALIZAR
const app = initializeApp(firebaseConfig);

// 🔐 EXPORTAR SERVICIOS
export const auth = getAuth(app);
export const db = getFirestore(app);