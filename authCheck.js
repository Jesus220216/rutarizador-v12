import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {

    // 🧠 esperar respuesta real
    if (user === null) {
        window.location.href = "index.html";
    }

});
