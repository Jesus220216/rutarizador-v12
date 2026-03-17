<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Login - Rutarizador V12</title>
</head>
<body>

  <h2>Iniciar Sesión</h2>

  <input id="user" type="text" placeholder="Usuario"><br><br>
  <input id="pass" type="password" placeholder="Contraseña"><br><br>
  <input id="key" type="text" placeholder="Key"><br><br>

  <button id="btnLogin">Login</button>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const btnLogin = document.querySelector("#btnLogin");
      btnLogin.addEventListener("click", login);
    });

    async function login() {
      const user = document.querySelector("#user").value;
      const pass = document.querySelector("#pass").value;
      const key = document.querySelector("#key").value;

      if (!user || !pass || !key) {
        alert("Completa todos los campos");
        return;
      }

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user, pass, key })
        });

        if (!res.ok) {
          throw new Error("Error en el servidor");
        }

        const data = await res.json();
        console.log("Respuesta:", data);

        if (data.success) {
          alert("Login exitoso ✅");
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard";
        } else {
          alert(data.message);
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el servidor ❌");
      }
    }
  </script>

</body>
</html>