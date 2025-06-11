<?php
session_start();  // Inicia la sesión
header("Cache-Control: no-cache, no-store, must-revalidate");
// Verifica si hay sesión activa
if (!isset($_SESSION['usuario'])) {
    header('Location: /login.php');
    exit();
}

// Verifica si el usuario es doctor
if ($_SESSION['usuario'] == 'Doctor') {
    header('Location: /panel/doctor.html');
    exit();
} else {
    $_SESSION['usuario'] == 'Doctor';
    header('Location: /panel/pacientes.html');
    exit();
}
?>