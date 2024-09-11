// Store para la grilla del detalle de la venta

Ext.define('ExtMVC.store.VentaDetalles', {
    extend: 'Ext.data.Store',
    model: 'ExtMVC.model.VentaDetalle',
    autoLoad: false,
    
});