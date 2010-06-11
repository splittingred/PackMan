
TP.grid.Plugins = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-plugins'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'plugin/getList'
            ,template: config.template
        }
        ,action: 'plugin/getList'
        ,fields: ['id','name']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Name'
            ,dataIndex: 'name'
            ,width: 250
        }]
        ,tbar: [{
            text: _('packman.plugin_add')
            ,handler: this.addPlugin
            ,scope: this
        }]
    });
    TP.grid.Plugins.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'name'}]);
};
Ext.extend(TP.grid.Plugins,TP.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: _('packman.plugin_remove')
            ,handler: this.remove.createDelegate(this,[{
                title: _('packman.plugin_remove')
                ,text: _('packman.plugin_remove_confirm')
            }])
            ,scope: this
        }];
    }
    ,addPlugin: function(btn,e) {
        var r = {};
        
        if (!this.windows.addPlugin) {
            this.windows.addPlugin = MODx.load({
                xtype: 'tp-window-plugin-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addPlugin.setValues(r);
        this.windows.addPlugin.show(e.target);
    }
});
Ext.reg('tp-grid-plugins',TP.grid.Plugins);


TP.window.AddPlugin = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpach'+Ext.id();
    Ext.applyIf(config,{
        title: _('packman.plugin_add')
        ,frame: true
        ,id: 'tp-window-plugin-add'
        ,fields: [{
            xtype: 'tp-combo-plugin'
            ,fieldLabel: _('packman.plugin')
            ,description: _('packman.plugin_desc')
            ,name: 'plugin'
            ,hiddenName: 'plugin'
            ,id: 'tp-'+this.ident+'-plugin'
            ,allowBlank: false
            ,pageSize: 20
        }]
    });
    TP.window.AddPlugin.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddPlugin,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('plugin');

        if (id != '' && this.fp.getForm().isValid()) {
            if (this.fireEvent('success',{
                id: fld.getValue()
                ,name: fld.getRawValue()
            })) {
                this.fp.getForm().reset();
                this.hide();
                return true;
            }
        } else {
            MODx.msg.alert(_('error'),_('packman.plugin_err_ns'));
        }
    }
});
Ext.reg('tp-window-plugin-add',TP.window.AddPlugin);

TP.combo.Plugin = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'plugin'
        ,hiddenName: 'plugin'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'element/plugin.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.Plugin.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.Plugin,MODx.combo.ComboBox);
Ext.reg('tp-combo-plugin',TP.combo.Plugin);