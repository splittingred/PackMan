
TP.grid.Packages = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-packages'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'package/getList'
        }
        ,action: 'package/getList'
        ,fields: ['signature']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Signature'
            ,dataIndex: 'signature'
            ,width: 250
        }]
        ,tbar: [{
            text: 'Add Package'
            ,handler: this.addPackage
            ,scope: this
        }]
    });
    TP.grid.Packages.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'signature'}]);
};
Ext.extend(TP.grid.Packages,MODx.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: 'Remove Package'
            ,handler: this.remove.createDelegate(this,[{
                title: 'Remove Package?'
                ,text: 'Are you sure you want to remove this Package?'
            }])
            ,scope: this
        }];
    }
    ,addPackage: function(btn,e) {
        var r = {};
        
        if (!this.windows.addPackage) {
            this.windows.addPackage = MODx.load({
                xtype: 'tp-window-package-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addPackage.setValues(r);
        this.windows.addPackage.show(e.target);
    }
});
Ext.reg('tp-grid-packages',TP.grid.Packages);


TP.window.AddPackage = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpapack'+Ext.id();
    Ext.applyIf(config,{
        title: 'Add Package'
        ,frame: true
        ,id: 'tp-window-package-add'
        ,fields: [{
            xtype: 'tp-combo-package'
            ,fieldLabel: 'Package'
            ,name: 'package'
            ,hiddenName: 'package'
            ,id: 'tp-'+this.ident+'-package'
            ,allowBlank: false
            ,pageSize: 20
        }]
    });
    TP.window.AddPackage.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddPackage,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('package');

        if (id != '' && this.fp.getForm().isValid()) {
            if (this.fireEvent('success',{
                signature: fld.getValue()
            })) {
                this.fp.getForm().reset();
                this.hide();
                return true;
            }
        } else {
            MODx.msg.alert(_('error'),'Please select a Package.');
        }
    }
});
Ext.reg('tp-window-package-add',TP.window.AddPackage);

TP.combo.Package = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'package'
        ,hiddenName: 'package'
        ,displayField: 'signature'
        ,valueField: 'signature'
        ,fields: ['signature']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'workspace/packages.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.Package.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.Package,MODx.combo.ComboBox);
Ext.reg('tp-combo-package',TP.combo.Package);