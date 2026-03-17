async function login() {
  const user = document.querySelector("#user").value;
  const pass = document.querySelector("#pass").value;
  const key = document.querySelector("#key").value;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, pass, key })
    });

    const data = await res.json();

    if (data.success) {
      alert("Login correcto");
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor");
  }
}