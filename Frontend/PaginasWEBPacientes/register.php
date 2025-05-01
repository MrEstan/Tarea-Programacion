<?php
// register.php

// Configurar conexión a MySQL
$host = "localhost";
$db = "mi_app";     // Tu base de datos
$user = "root";     // Tu usuario de MySQL
$pass = "";         // Tu contraseña de MySQL

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo "Error de conexión con la base de datos.";
    exit;
}

// Recibir los datos del JSON
$data = json_decode(file_get_contents("php://input"), true);

$usuario = $data["username"] ?? '';
$contrasena = $data["password"] ?? '';

// Validaciones básicas
if (empty($usuario) || empty($contrasena)) {
    http_response_code(400);
    echo "Faltan datos.";
    exit;
}

// Encriptar la contraseña
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

// Insertar el usuario en la base de datos
$stmt = $conn->prepare("INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo "Error al preparar la consulta.";
    exit;
}
$stmt->bind_param("ss", $usuario, $contrasena);
    exit;

if ($stmt->execute()) {
    http_response_code(200);
} else {
    http_response_code(400);
    if ($conn->errno === 1062) {
        echo "El usuario ya existe.";
    } else {
        echo "Error al registrar usuario.";
    }
}

$stmt->close();
$conn->close();

header("Location:Register.html");
?>
