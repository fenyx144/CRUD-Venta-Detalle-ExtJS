/*
    Viewport que maneja la estructura de la pagina
    Contara con Botones Nuevo, Modificar y Eliminar y sus respectivos iconos
    junto con las dos grillas para la venta y el detalle de la venta 
*/

Ext.define('ExtMVC.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',
    requires: [
        'ExtMVC.view.Venta.Grid',
        'ExtMVC.view.Venta.DetalleGrid',
        'ExtMVC.view.Venta.Formulario',
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                title: 'Ventas y Detalles',
                layout: 'border',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        iconCls: 'icon-add',
                        itemId: 'add',
                        text: 'Nuevo',
                        action: 'add'
                    },{
                        iconCls: 'icon-edit',
                        text: 'Modificar',
                        action: 'edit'
                    },{
                        iconCls: 'icon-delete',
                        text: 'Eliminar',
                        action: 'delete'
                    }],
                }],
                items: [{
                    xtype: 'VentaGrid',         
                    region: 'west',           
                    width: 500,               
                    split: true,               
                    title: 'Ventas'
                }, {
                    xtype: 'VentaDetalleGrid', 
                    region: 'center',          
                    title: 'Detalles de Venta'
                }]
            }]
        });

        this.callParent(arguments);
    }
});
