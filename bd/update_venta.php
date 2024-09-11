<?php
//Script para actualizar una venta con su respectivo detalle ,ediante el ide de la venta
header('Content-Type: application/json');
include 'conectar.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $id = $data['ven_ide'];
    $serie = $data['ven_ser'];
    $numero = $data['ven_num'];
    $cliente = $data['ven_cli'];
    $monto = $data['ven_mon'];

    $queryVenta = "
        UPDATE prueba.venta
        SET ven_ser = $1,
            ven_num = $2,
            ven_cli = $3,
            ven_mon = $4
        WHERE ven_ide = $5
    ";

    pg_prepare($dbconn, "update_venta", $queryVenta);
    $resultVenta = pg_execute($dbconn, "update_venta", array($serie, $numero, $cliente, $monto, $id));

    if ($resultVenta) {
        $producto = $data['v_d_pro'];
        $precioUnitario = $data['v_d_uni'];
        $cantidad = $data['v_d_can'];

        $queryDetalle = "
            UPDATE prueba.venta_detalle
            SET v_d_pro = $1,
                v_d_uni = $2,
                v_d_can = $3
            WHERE ven_ide = $4
            RETURNING v_d_tot
        ";

        pg_prepare($dbconn, "update_venta_detalle", $queryDetalle);
        $resultDetalle = pg_execute($dbconn, "update_venta_detalle", array($producto, $precioUnitario, $cantidad, $id));
        
        if ($resultDetalle) {
            $v_d_tot = pg_fetch_result($resultDetalle, 0, 'v_d_tot');
            echo json_encode([
                'success' => true,
                'data' => [
                    'v_d_tot' => $v_d_tot
                ],
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Error al actualizar el detalle de la venta.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al actualizar la venta.'
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
