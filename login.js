// 🔥 IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔑 CONFIG (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyD1w_66STxqf5iMVneB8DgLnpFwS8RGy3g",
  authDomain: "rutarizador-v12.firebaseapp.com",
  projectId: "rutarizador-v12",
  storageBucket: "rutarizador-v12.firebasestorage.app",
  messagingSenderId: "928870753252",
  appId: "1:928870753252:web:f57cb32567e1a1138b1df1"
};

// 🚀 INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 LOGIN
async function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login correcto");

    // 👉 ir a dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("❌ " + error.code);
  }
}

// 📝 REGISTER
async function handleRegister() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Usuario registrado");

  } catch (error) {

    if (error.code === "auth/email-already-in-use") {
      alert("⚠️ Este correo ya existe");
    } else {
      alert("❌ " + error.code);
    }

  }
}

// 🔘 BOTONES
document.getElementById("loginBtn").addEventListener("click", handleLogin);
document.getElementById("registerBtn").addEventListener("click", handleRegister);
