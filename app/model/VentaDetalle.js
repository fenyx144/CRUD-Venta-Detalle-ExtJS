// Modelo para el detalle de la venta

Ext.define('ExtMVC.model.VentaDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        'v_d_ide',
        'ven_ide',
        'v_d_pro',
        'v_d_uni',
         'v_d_can', 
        'v_d_tot',
        'est_ado'],
    idProperty: 'v_d_ide'
});