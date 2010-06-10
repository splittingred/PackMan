
TP.grid.Snippets = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-snippets'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'tsnippet/getList'
            ,template: config.template
        }
        ,action: 'snippet/getList'
        ,fields: ['id','name','assets_path','core_path']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Name'
            ,dataIndex: 'name'
            ,width: 250
        },{
            header: 'Assets Path'
            ,dataIndex: 'assets_path'
            ,width: 300
        },{
            header: 'Core Path'
            ,dataIndex: 'core_path'
            ,width: 300
        }]
        ,tbar: [{
            text: 'Add Snippet'
            ,handler: this.addSnippet
            ,scope: this
        }]
    });
    TP.grid.Snippets.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'name'}]);
};
Ext.extend(TP.grid.Snippets,MODx.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: 'Remove Snippet'
            ,handler: this.remove.createDelegate(this,[{
                title: 'Remove Snippet?'
                ,text: 'Are you sure you want to remove this Snippet?'
            }])
            ,scope: this
        }];
    }
    ,addSnippet: function(btn,e) {
        var r = {};
        if (!this.windows.addSnippet) {
            this.windows.addSnippet = MODx.load({
                xtype: 'tp-window-snippet-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addSnippet.setValues(r);
        this.windows.addSnippet.show(e.target);
    }
});
Ext.reg('tp-grid-snippets',TP.grid.Snippets);


TP.window.AddSnippet = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpasn'+Ext.id();
    Ext.applyIf(config,{
        title: 'Add Snippet'
        ,frame: true
        ,id: 'tp-window-snippet-add'
        ,fields: [{
            xtype: 'tp-combo-snippet'
            ,fieldLabel: 'Snippet'
            ,name: 'snippet'
            ,hiddenName: 'snippet'
            ,id: 'tp-'+this.ident+'-snippet'
            ,allowBlank: false
            ,pageSize: 20
            ,listeners: {
                'select':{fn:this.selectSnippet,scope:this}
            }
        },{
            xtype: 'textfield'
            ,name: 'assets_path'
            ,id: 'tp-snippet-assets-path'
            ,fieldLabel: 'Assets Path'
            ,description: _('templatepackager.snippet_assets_path_desc')
            ,value: '{assets_path}components/mycomponent/'
            ,width: 300
        },{
            xtype: 'textfield'
            ,name: 'core_path'
            ,id: 'tp-snippet-core-path'
            ,fieldLabel: 'Core Path'
            ,description: _('templatepackager.snippet_core_path_desc')
            ,value: '{core_path}components/mycomponent/'
            ,width: 300
        }]
    });
    TP.window.AddSnippet.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddSnippet,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('snippet');
        var flap = f.findField('assets_path');
        var flcp = f.findField('core_path');

        if (id != '' && this.fp.getForm().isValid()) {
            if (this.fireEvent('success',{
                id: fld.getValue()
                ,name: fld.getRawValue()
                ,assets_path: flap.getValue()
                ,core_path: flcp.getValue()
            })) {
                this.fp.getForm().reset();
                this.hide();
                return true;
            }
        } else {
            MODx.msg.alert(_('error'),'Please select a Snippet.');
        }
    }

    ,selectSnippet: function(cb,nv,ov) {
        var f = this.fp.getForm();
        var v = cb.getRawValue();
        var p = Ext.util.Format.lowercase(v);

        f.findField('assets_path').setValue('{assets_path}components/'+p+'/');
        f.findField('core_path').setValue('{core_path}components/'+p+'/');
    }
});
Ext.reg('tp-window-snippet-add',TP.window.AddSnippet);

TP.combo.Snippet = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'snippet'
        ,hiddenName: 'snippet'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'element/snippet.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.Snippet.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.Snippet,MODx.combo.ComboBox);
Ext.reg('tp-combo-snippet',TP.combo.Snippet);