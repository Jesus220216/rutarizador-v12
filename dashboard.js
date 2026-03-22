import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

let userRef;

// 🔐 CONTROL DE SESIÓN (CORREGIDO)
onAuthStateChanged(auth, async (user) => {

  if (user === undefined) return; // 🔥 evita bug

  if (!user) {
    console.log("No hay sesión");
    window.location.href = "index.html";
    return;
  }

  console.log("Usuario activo:", user.email);

  document.body.style.display = "block";

  userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  const data = snap.data();

  if (!data) return;

  document.getElementById("saldo").textContent = "$" + data.earnings.toFixed(2);
  document.getElementById("today").textContent = "$" + data.today.toFixed(2);
  document.getElementById("refs").textContent = data.refs || 0;
  document.getElementById("myCode").textContent = data.referralCode;

});
