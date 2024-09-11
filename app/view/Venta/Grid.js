/*
	Vista para la grilla de ventas	
	cuenta con las columnas  para el id, serie, numero, cliente, monto, estado
*/

Ext.define('ExtMVC.view.Venta.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.VentaGrid',
    title: 'Ventas',
    store: 'Ventas',
    iconCls: 'icon-grid',
	frame: true,
    columns: [
        { header: 'ID', dataIndex: 'ven_ide', hidden: true },
        { header: 'Serie', dataIndex: 'ven_ser' },
        { header: 'Numero', dataIndex: 'ven_num' },
        { header: 'Cliente', dataIndex: 'ven_cli' },
        { header: 'Monto', dataIndex: 'ven_mon' },
        { header: 'est_ado', dataIndex: 'est_ado', hidden: true, value: 1 }
    ],        
});
