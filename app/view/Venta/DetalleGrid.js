Ext.define('ExtMVC.view.Venta.DetalleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.VentaDetalleGrid',
    title: 'Detalles de Venta',
    store: 'VentaDetalles',
    columns: [
        { header: 'ID', dataIndex: 'v_d_ide', hidden: true },
        { header: 'Producto', dataIndex: 'v_d_pro' },
        { header: 'Unidad', dataIndex: 'v_d_uni' },
        { header: 'Cantidad', dataIndex: 'v_d_can' },
        { header: 'Total', dataIndex: 'v_d_tot' },
        {
             header: 'Estado', dataIndex: 'est_ado',
            renderer: function(value) { return value == 0 ? 'Eliminado' : 'Activo'; }
         },
    ]
});
