import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {

  if (user) {
    if (location.pathname.includes("index.html")) {
      window.location.href = "dashboard.html";
    }
  } else {
    if (location.pathname.includes("dashboard.html")) {
      window.location.href = "index.html";
    }
  }

});