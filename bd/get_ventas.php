<?php
//Script para obtener los registros de la tabla prueva.venta

header('Content-Type: application/json');
include 'conectar.php';

$query = "
    SELECT v.*, vd.est_ado
    FROM prueba.venta v
    JOIN prueba.venta_detalle vd ON v.ven_ide = vd.ven_ide
    ORDER BY v.ven_ide ASC;
";

$result = pg_query($dbconn, $query);

if ($result) {
    $data = [];
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode([
        'success' => true,
        'data' => $data
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener las ventas.'
    ]);
}
pg_close($dbconn);
?>
