/*
    Controller principal para el funcionamiento de la pagina
    Se define el funcionamiento de los botones y el funcionamiento  del formulario
*/

Ext.define('ExtMVC.controller.Ventas', {
    extend: 'Ext.app.Controller',
    stores: ['Ventas', 'VentaDetalles'],
    models: ['Venta', 'VentaDetalle'],
    views: ['Venta.Grid', 'Venta.DetalleGrid', 'Venta.Formulario'],
    refs: [{
        ref: 'VentaGrid',
        selector: 'VentaGrid'
    }, {
        ref: 'VentaDetalleGrid',
        selector: 'VentaDetalleGrid'
    }, {
        ref: 'VentaForm',
        selector: 'VentaForm'
    }],
    //Cargamos las ventas cuando se inicia la pagina
    onLaunch: function () {
        var ventasStore = Ext.getStore('Ventas');
        ventasStore.load();
    },
    //Indicamos los eventos
    init: function () {
        this.control({
            'VentaGrid dataview': {
                itemdblclick: this.mostrarDetalle
            },
            'button[action=add]': {
                click: this.addVenta
            },
            'button[action=edit]': {
                click: this.editVenta
            },
            'button[action=delete]': {
                click: this.deleteVenta
            },
            'VentaForm button[action=save]': {
                click: this.saveVenta
            }
        });
    },
    //Funcion para mostrar el detalle cuando se seleccione una venta
    mostrarDetalle: function (grid, record) {
        var ven_ide = record.get('ven_ide');
            ventaDetalleStore = this.getVentaDetallesStore();
        Ext.Ajax.request({
            url: 'bd/get_venta_detalles.php',  // Ruta al archivo PHP
            method: 'POST',
            jsonData: { 'ven_ide': ven_ide },
            callback: function (options, success, response) {
                if(success) {
                    respuesta = Ext.decode(response.responseText);
                    ventaDetalleStore.removeAll();
                    ventaDetalleStore.add(respuesta.data);
                }
            },
        });
    },
    //Funcion que se llama cuando se hace click en el boton 'Nuevo'
    addVenta: function (button) {
        Ext.create('ExtMVC.view.Venta.Formulario');
    },
    //Funcion que guarda los datos de la venta y eldetalle yasea para crear o editar
    saveVenta: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            ventaStore = this.getVentasStore(),
            ventaDetalleStore = this.getVentaDetallesStore();
        ventaDetalleStore.removeAll();

        ventaDetalleStore.add({
            v_d_ide: values.v_d_ide,
            v_d_pro: values.v_d_pro,
            v_d_uni: values.v_d_uni,
            v_d_can: values.v_d_can,
            v_d_tot: values.v_d_tot,
            est_ado: values.est_ado
        });

        // Si la venta existe se actualiza el registro en caso contrario se crea
        if (values.ven_ide != -1) {
            var grid = this.getVentaGrid(),
                selectionModel = grid.getSelectionModel(), 
                recordVenta = selectionModel.getSelection()[0];

            recordVenta.set(values);
            
            Ext.Ajax.request({
                url: 'bd/update_venta.php',
                method: 'POST',
                jsonData: values,  
                callback: function (options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    if (success && respuesta.data) {                        
                        recordDetalle = ventaDetalleStore.getAt(0);
                        recordDetalle.set('v_d_tot', respuesta.data.v_d_tot);
                    }
                }
            });
        } else {
            var recordVenta = Ext.create('ExtMVC.model.Venta', values);
            ventaStore.add(recordVenta);

            Ext.Ajax.request({
                url: 'bd/save_venta.php',
                method: 'POST',
                jsonData: values,
                callback: function (options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    if (success && respuesta.data) {
                        recordVenta.set('ven_ide', respuesta.data.ven_ide);
                        recordDetalle = ventaDetalleStore.getAt(0);
                        recordDetalle.set('v_d_tot', respuesta.data.v_d_tot);
                    }
                }
            });
        }
        win.close();
    },
    //Funcion para editar la venta y el detalle
    editVenta: function (button) {
        var grid = this.getVentaGrid(),
            selectionModel = grid.getSelectionModel(),
            record = selectionModel.getSelection()[0];

        if (record != null) {
            var ven_ide = record.get('ven_ide');
                ventaDetalleStore = this.getVentaDetallesStore();
            Ext.Ajax.request({
                url: 'bd/get_venta_detalles.php',  // Ruta al archivo PHP
                method: 'POST',
                jsonData: { 'ven_ide': ven_ide },
                callback: function (options, success, response) {
                    respuesta = Ext.decode(response.responseText);
                    dataVenta = {
                        'ven_ide': ven_ide,
                        'ven_ser': record.get('ven_ser'),
                        'ven_num': record.get('ven_num'),
                        'ven_cli': record.get('ven_cli'),
                        'ven_mon': record.get('ven_mon'),

                    };
                    var dataDetalle = respuesta.data;
                        mergedData = { ...dataVenta, ...dataDetalle };

                    ventaDetalleStore.removeAll();
                    ventaDetalleStore.add(dataDetalle);

                    var edit = Ext.create('ExtMVC.view.Venta.Formulario');
                    edit.down('form').getForm().setValues(mergedData);

                },
            });
        } else {
            Ext.Msg.alert('Advertencia', 'Seleccione una venta para modificar.');
        }
    },
    //Funcion para eliminar una venta con su detalle cambiando el estado de Activo a eliminado
    deleteVenta: function (button) {
        var grid = this.getVentaGrid(),
            recordVenta = grid.getSelectionModel().getSelection()[0];
        
        if (recordVenta) {
            this.mostrarDetalle(grid, recordVenta);
            var ventaDetalleStore = this.getVentaDetallesStore();
            
            var est_ado = recordVenta.get('est_ado');
            if (est_ado == 1) {
                var ven_ide = recordVenta.get('ven_ide');
                Ext.Msg.confirm('Eliminar Venta', 'Esta seguro de que desea eliminar esta venta?',
                    function (btn) {
                        if (btn === 'yes') {
                            Ext.Ajax.request({
                                url: 'bd/delete_venta.php',
                                method: 'POST',
                                jsonData: { 'ven_ide': ven_ide },
                                callback: function(options, success, response) {
                                    if(success) {
                                            recordVenta.set('est_ado', '0');
                                            recordDetalle = ventaDetalleStore.getAt(0);
                                            recordDetalle.set('est_ado', '0');
                                    }        
                                }
                            });
                        }
                    });
            } else {
                Ext.Msg.alert('Advertencia', 'La venta ya fue eliminada.');
            }
        } else {
            Ext.Msg.alert('Advertencia', 'Seleccione una venta para eliminar.');
        }
    }
});