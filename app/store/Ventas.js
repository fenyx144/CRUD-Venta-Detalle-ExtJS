// Store para la grilla de la venta

Ext.define('ExtMVC.store.Ventas', {
    extend: 'Ext.data.Store',
    model: 'ExtMVC.model.Venta',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: 'bd/get_ventas.php',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
        
    }
});
