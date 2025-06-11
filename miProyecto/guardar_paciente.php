<?php
$conexion = new mysqli("localhost", "root", "", "mi_app");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "mensaje" => "Error al conectar con la base de datos."]);
    exit();
}

$cedula = $_POST['cedula'];
$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];

$sql = "INSERT INTO pacientes (Cedula, nombre, edad, direccion, telefono) VALUES (?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssiss", $cedula, $nombre, $edad, $direccion, $telefono);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Paciente registrado con éxito."]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al registrar paciente."]);
}

$stmt->close();
$conexion->close();
?>
