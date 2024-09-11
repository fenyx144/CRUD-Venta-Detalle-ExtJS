<?php
//Script para insertar la venta y su cabecera
header('Content-Type: application/json');
include 'conectar.php';

//if (isset($_POST['data'])) {
  //  $data = json_decode($_POST['data'], true);
    $data = json_decode(file_get_contents('php://input'), true);
    $serie = $data['ven_ser'];
    $numero = $data['ven_num'];
    $cliente = $data['ven_cli'];
    $monto = $data['ven_mon'];

    $v_d_pro = $data['v_d_pro'];
    $v_d_uni = $data['v_d_uni'];
    $v_d_can = $data['v_d_can'];
    $est_ado = $data['est_ado'];

    $query = "
        INSERT INTO prueba.venta (ven_ser, ven_num, ven_cli, ven_mon)
        VALUES ($1, $2, $3, $4) RETURNING ven_ide
    ";

    pg_prepare($dbconn, "insert_venta", $query);
    $result = pg_execute($dbconn, "insert_venta", array($serie, $numero, $cliente, $monto));
    
    if ($result) {
        $ven_ide = pg_fetch_result($result, 0, 'ven_ide');
        $query = "
            INSERT INTO prueba.venta_detalle (ven_ide, v_d_pro, v_d_uni, v_d_can)
            VALUES ($1, $2, $3, $4)
            RETURNING v_d_tot
        ";

        pg_prepare($dbconn, "insert_venta_detalle", $query);
        $result = pg_execute($dbconn, "insert_venta_detalle", array($ven_ide, $v_d_pro, $v_d_uni, $v_d_can));
        $v_d_tot = pg_fetch_result($result, 0, 'v_d_tot');
        echo json_encode([
            'success' => true,
            'data' => [
                'ven_ide' => $ven_ide,
                'v_d_tot' => $v_d_tot
            ],
            'message' => 'Venta insertada correctamente.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al insertar la venta.'
        ]);
    }
/*} else {
    echo json_encode([
        'success' => false,
        'message' => 'Datos no válidos.'
    ]);
}*/
?>
