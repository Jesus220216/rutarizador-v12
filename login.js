import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

registerBtn.addEventListener("click", async () => {

  const email = loginEmail.value;
  const password = loginPassword.value;
  const refInput = referralCode.value;

  try {

    // 🔐 crear usuario
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // 🎯 generar código único
    const myCode = Math.random().toString(36).substring(2,8).toUpperCase();

    // 💾 GUARDAR EN FIRESTORE (LO QUE TE FALTA)
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      referralCode: myCode,
      referredBy: refInput || null,
      earnings: 0,
      today: 0,
      refs: 0,
      createdAt: new Date()
    });

    alert("Registrado correctamente");

  } catch (error) {
    alert(error.message);
  }

});
