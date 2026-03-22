<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD1w_66STxqf5iMVneB8DgLnpFwS8RGy3g",
    authDomain: "rutarizador-v12.firebaseapp.com",
    projectId: "rutarizador-v12",
    storageBucket: "rutarizador-v12.firebasestorage.app",
    messagingSenderId: "928870753252",
    appId: "1:928870753252:web:f57cb32567e1a1138b1df1",
    measurementId: "G-GWWX1TMDS8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
