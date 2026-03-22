import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD1w_66STxqf5iMVneB8DgLnpFwS8RGy3g",
  authDomain: "rutarizador-v12.firebaseapp.com",
  projectId: "rutarizador-v12",
  storageBucket: "rutarizador-v12.appspot.com",
  messagingSenderId: "928870753252",
  appId: "1:928870753252:web:f57cb32567e1a1138b1df1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN
async function handleLogin() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.code);
  }
}

// REGISTER + REFERIDOS
async function handleRegister() {
  const email = loginEmail.value;
  const password = loginPassword.value;
  const refInput = referralCode.value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const myCode = user.uid.substring(0,6).toUpperCase();

    let referredBy = null;

    if (refInput) {
      const snap = await getDocs(collection(db, "users"));
      snap.forEach(d => {
        if (d.data().referralCode === refInput) {
          referredBy = d.id;
        }
      });
    }

    await setDoc(doc(db, "users", user.uid), {
      email,
      referralCode: myCode,
      referredBy,
      createdAt: new Date()
    });

    alert("Registrado");
  } catch (e) {
    alert(e.code);
  }
}

// EVENTOS
window.addEventListener("DOMContentLoaded", () => {
  loginBtn.onclick = handleLogin;
  registerBtn.onclick = handleRegister;
});
