<?php
//Script para eliminar una venta y su detalle modificando su estado
header('Content-Type: application/json');
include 'conectar.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $ven_ide = $data['ven_ide'];
    
    $query = "
        UPDATE prueba.venta_detalle
        SET est_ado = 0
        WHERE ven_ide = $1
    ";

    pg_prepare($dbconn, "delete_venta", $query);
    $result = pg_execute($dbconn, "delete_venta", array($ven_ide));

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Venta eliminada correctamente.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al eliminar la venta.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Datos no válidos.'
    ]);
}
pg_close($dbconn);
?>
