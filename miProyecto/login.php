<?php
session_start();  // Inicia la sesión

function conectarBD() {
    $host = "localhost";
    $db = "mi_app";
    $user = "root";
    $pass = "";
    return new mysqli($host, $user, $pass, $db);
}

function validarDatos($usuario, $contrasena) {
    if (empty($usuario) || empty($contrasena)) {
        return "Faltan datos";
    }
    return "";
}

function autenticarUsuario($conn, $usuario, $contrasena) {
    $stmt = $conn->prepare("SELECT contrasena, doctor FROM usuarios WHERE usuario = ?");
    if (!$stmt) {
        return "Error en la preparación de la consulta";
    }

    $contrasena_guardada = "";
    $doctor = "";

    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        $stmt->close();
        return "Usuario no encontrado";
    }
    
    $contrasena_guardada = "";
    $doctor = 0;

    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        $stmt->close();
        return "Usuario no encontrado";
    }

    $stmt->bind_result($contrasena_guardada, $doctor);
    $stmt->fetch();

    $_SESSION['usuario'] = $usuario;
    $_SESSION['doctor'] = $doctor == 1 ? true : false;


    $resultado = $contrasena === $contrasena_guardada
        ? "Inicio de sesión exitoso"
        : "Contraseña incorrecta";

    $stmt->close();
    return $resultado;
}

// --- Lógica principal ---
$usuario = $_POST["usuario"] ?? "";
$contrasena = $_POST["contrasena"] ?? "";
$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn = conectarBD();

    if ($conn->connect_error) {
        $message = "No se pudo conectar a la base de datos";
    } else {
        $message = validarDatos($usuario, $contrasena);
        if (empty($message)) {
            $message = autenticarUsuario($conn, $usuario, $contrasena);

            if ($message === "Inicio de sesión exitoso") {
                $_SESSION['usuario'] = $usuario;
                $_SESSION["doctor"] = $doctor == 1 ? true : false;
                header("Location: panel/index.php");
                exit();
            }
        }
        $conn->close();
    }
}

// Puedes usar $message en HTML o JS a continuación
?>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Pacientes - Inicio</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
        }   
        body {
            display: flex;
            flex-direction: column;
            background: linear-gradient(to right, #00c6ff, #035a94);
            font-family: Arial, sans-serif;
        }
        .content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .login-container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            border: 2px solid #007acc;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            width: 300px;
        }
        h2 {
            text-align: center;
            color: #007acc;
        }
        label {
            display: block;
            margin-top: 15px;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .buttons button {
            flex: 1;
            padding: 10px;
            background-color: #007acc;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .buttons button:hover {
            background-color: #005a99;
        }
        .error {
            color: red;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
        }
        footer {
            text-align: center;
            padding: 15px;
            color: white;
            background: linear-gradient(to right, #038fb6, #035a94);
        }
    </style>
</head>
<body>

    <div class="content">
        <img src="imagen\sis.jpg" alt="Imagen" class="caratula" width="340" height="340">
        <div class="login-container">
            <h2>Iniciar Sesión</h2>
            <form action="login.php" method="post"id="loginForm">
                <label for="usuario">Nombre De Usuario:</label>
                <input type="text" id="usuario" name="usuario" required>

                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" required>

                <div class="buttons">
                  <button type="submit">Ingresar</button>

                  <a href="register.php">
    <button type="button" id="registerBtn">Registrarse</button>
</a>
                </div>

                <div class="error" id="mensaje-error"></div>
            </form>
        </div>
    </div>

    <footer>
        &copy; 2025 Sistema De Pacientes - Todos los derechos reservados
    </footer>


</body>
</html>