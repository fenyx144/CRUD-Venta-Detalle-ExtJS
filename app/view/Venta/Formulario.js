//Formulario para la insercion y modificacion de la venta y su detalle


Ext.define('ExtMVC.view.Venta.Formulario', {
    extend: 'Ext.window.Window',
    alias: 'widget.VentaForm',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    title: 'Nueva Venta/Modificar Venta',
    
    layout: 'fit',
    autoShow: true,
    width: 300,
    height: 280,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'left',
                allowBlank: false,
                combineErrors: true,
                msgTarget: 'side'
            },
            items: [
                { xtype: 'textfield', name: 'ven_ide', hidden: true, value: -1 },
                { xtype: 'textfield', name: 'ven_ser', fieldLabel: 'Serie' },
                { xtype: 'textfield', name: 'ven_num', fieldLabel: 'Numero' },
                { xtype: 'textfield', name: 'ven_cli', fieldLabel: 'Cliente' },
                { xtype: 'numberfield', name: 'ven_mon', fieldLabel: 'Monto',  decimalPrecision: 2, },
                { xtype: 'container', height: 20 },
                { xtype: 'textfield', name: 'v_d_ide', hidden: true, value: -1 },
                { xtype: 'textfield', name: 'v_d_pro', fieldLabel: 'Producto' },
                { xtype: 'numberfield', name: 'v_d_uni', fieldLabel: 'Precio Unitario', decimalPrecision: 2,},
                { xtype: 'numberfield', name: 'v_d_can', fieldLabel: 'Cantidad' },
                { xtype: 'numberfield', name: 'v_d_tot', hidden:true },
                { xtype: 'textfield', name: 'est_ado', hidden: true, value: 1 },
            ]
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id: 'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Guardar',
                action: 'save'
            }, {
                    iconCls: 'icon-reset',
                    text: 'Cancelar',
                    scope: this,
                    handler: this.close
                }]
        }];

        this.callParent(arguments);
    }
});
