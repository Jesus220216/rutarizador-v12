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

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.body.style.display = "block";

  userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  const data = snap.data();

  document.getElementById("saldo").textContent = "$" + data.earnings.toFixed(2);
  document.getElementById("today").textContent = "$" + data.today.toFixed(2);
  document.getElementById("refs").textContent = data.refs;
  document.getElementById("myCode").textContent = data.referralCode;

});

// 📺 ANUNCIO
window.verAnuncio = async () => {
  await updateDoc(userRef, {
    earnings: increment(0.01),
    today: increment(0.01)
  });
  location.reload();
};

// 🎮 MINI JUEGO
window.miniJuego = async () => {
  await updateDoc(userRef, {
    earnings: increment(0.02),
    today: increment(0.02)
  });
  alert("Ganaste $0.02");
  location.reload();
};

// 💳 RETIRO
window.retirar = () => {
  alert("Retiro solicitado (demo)");
};

// 📋 COPIAR REFERIDO
window.copyMyRef = () => {
  navigator.clipboard.writeText(
    window.location.origin + "?ref=" +
    document.getElementById("myCode").textContent
  );
  alert("Link copiado");
};

// 🚪 LOGOUT
window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};