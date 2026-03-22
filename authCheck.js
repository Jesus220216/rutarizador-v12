import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {

    if (user) {
        // ✅ usuario logueado
        document.body.style.display = "block";
    } else {
        // ❌ no logueado
        window.location.href = "index.html";
    }

});;
