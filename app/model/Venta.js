// Model para la Venta

Ext.define('ExtMVC.model.Venta', {
    extend: 'Ext.data.Model',
    fields: [
            'ven_ide',
            'ven_ser',
            'ven_num', 
            'ven_cli', 
            'ven_mon', 
            'est_ado'
    ],
    //fields: ['ven_ide', 'ven_ser', 'ven_num', 'ven_cli', 'ven_mon', 'v_d_ide', 'v_d_pro', 'v_d_uni', 'v_d_can', 'v_d_tot', 'est_ado'],
    idProperty: 'ven_ide'
});