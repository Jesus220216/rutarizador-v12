export default function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { user, pass, key } = req.body;

    // Usuario de prueba
    if (user === "admin" && pass === "1234" && key === "abc") {
        return res.status(200).json({
            success: true,
            token: "token123",
            message: "Login exitoso"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Datos incorrectos"
    });
}