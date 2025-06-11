<?php
// register.php

$message = "";

// Función para conectar a la base de datos
function conectarBD() {
    $host = "localhost";
    $db = "mi_app"; 
    $user = "root";  
    $pass = "";  
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        return null;
    }
    return $conn;
}

// Función para registrar un usuario
function registrarUsuario($conn, $usuario, $contrasena) {
    global $message;

    // Validaciones básicas
    if (empty($usuario) || empty($contrasena)) {
        $message = "Faltan datos.";
        return;
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)");
    if (!$stmt) {
        $message = "Error al preparar la consulta.";
        return;
    }

    $stmt->bind_param("ss", $usuario, $contrasena);

    if ($stmt->execute()) {
        header("Location: login.php");
        exit;
    } else {
        if ($conn->errno === 1062) {
            $message = "El usuario ya existe.";
        } else {
            $message = "Error al registrar usuario.";
        }
    }

    $stmt->close();
}

// Ejecutar registro si se recibió usuario y contraseña
if (isset($_POST["usuario"]) && isset($_POST["contrasena"])) {
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    $conn = conectarBD();
    if ($conn) {
        registrarUsuario($conn, $usuario, $contrasena);
        $conn->close();
    } else {
        $message = "Error de conexión con la base de datos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Usuario</title>
  <style>
    body { display:flex; justify-content:center; align-items:center; height:100vh;
           background:linear-gradient(to right, #00c6ff, #035a94); font-family:Arial, sans-serif; }
    .login-container { background:#fff; padding:40px; border-radius:10px;
                       border:2px solid #007acc; box-shadow:0 0 15px rgba(0,0,0,0.2); width:300px; }
    input, button { width:100%; padding:8px; margin-top:10px; border-radius:5px; }
    button { background:#007acc; color:#fff; border:none; cursor:pointer; }
    button:hover { background:#005a99; }
    .error { color:red; margin-top:10px; font-size:14px; text-align:center; }
  </style>
</head>
<body>
  <div class="login-container">
    <h2>Registro</h2>
    <form action="register.php" method="post" id="registerForm">
      <label for="usuarioReg">Nombre de Usuario:</label>
      <input type="text" id="usuarioReg" name="usuario" required>
      
      <label for="contrasenaReg">Contraseña:</label>
      <input type="password" id="contrasenaReg" name="contrasena" required>
      
      <button type="submit">Registrarse</button>
      <div class="error" id="register-error"></div>
    </form>
  </div>
</body>
</html>
