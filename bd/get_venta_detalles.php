<?php
//Script para obtener el detalle de una venta mediante el ide de la venta
header('Content-Type: application/json');
include 'conectar.php';

$data = json_decode(file_get_contents('php://input'), true);  
if ($data) {
    $venIde = $data['ven_ide'];

    $query = "
        SELECT * FROM prueba.venta_detalle
        WHERE ven_ide = $1
    ";

    pg_prepare($dbconn, "get_venta_detalles", $query);
    $result = pg_execute($dbconn, "get_venta_detalles", array($venIde));

    if ($result) {
        $data = pg_fetch_assoc($result);
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los detalles de venta.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'ID de venta no proporcionado.'
    ]);
}
pg_close($dbconn);
?>
