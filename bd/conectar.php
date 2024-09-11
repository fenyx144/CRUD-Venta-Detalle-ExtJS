
<?php
// Script para realizar la conexion con la base de datos

$host = 'localhost'; 
$port = '5432'; 
$dbname = 'postgres';
$user = 'postgres'; 
$password = 'admin';

// Conectar a PostgreSQL
$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";
$dbconn = pg_connect($conn_string);

// Enviar mensaje de error y finalizar ejecución si no se puede conectar
if (!$dbconn) {    
    die(json_encode(['success' => false, 'message' => 'No se pudo conectar a la base de datos.']));
}
?>
