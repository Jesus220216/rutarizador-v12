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

// 🔥 IMPORTS EXTERNOS
import { mostrarAnuncio } from "./ads.js";
import { enviarPago } from "./paypal.js";

// 🧠 ANTI FRAUDE
let lastClick = 0;

function puedeClick() {
  const now = Date.now();

  if (now - lastClick < 5000) {
    alert("Espera unos segundos...");
    return false;
  }

  lastClick = now;
  return true;
}

let userRef;
let cargado = false;

// 🔐 CONTROL DE SESIÓN
onAuthStateChanged(auth, async (user) => {

  if (cargado) return;
  cargado = true;

  if (!user) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 300);
    return;
  }

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

// 📺 ANUNCIO (PROTEGIDO)
window.verAnuncio = async () => {

  if (!puedeClick()) return;

  mostrarAnuncio();

  await updateDoc(userRef, {
    earnings: increment(0.02),
    today: increment(0.02)
  });

};

// 🎮 MINI JUEGO
window.miniJuego = async () => {

  if (!puedeClick()) return;

  await updateDoc(userRef, {
    earnings: increment(0.02),
    today: increment(0.02)
  });

  alert("Ganaste $0.02 🎉");
};

// 💳 RETIRO
window.retirar = async () => {

  const email = document.getElementById("paypal").value;

  if (!email) {
    alert("Ingresa PayPal");
    return;
  }

  const snap = await getDoc(userRef);
  const data = snap.data();

  if (data.earnings < 1) {
    alert("Mínimo $1");
    return;
  }

  alert("Procesando pago...");

  await enviarPago(email, data.earnings);

  await updateDoc(userRef, {
    earnings: 0
  });

  alert("Pago enviado 💸");
};

// 📋 COPIAR REFERIDO
window.copyMyRef = () => {
  const code = document.getElementById("myCode").textContent;

  navigator.clipboard.writeText(
    window.location.origin + "?ref=" + code
  );

  alert("Link copiado 🚀");
};

// 🚪 LOGOUT
window.logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Error al cerrar sesión");
  }
};
