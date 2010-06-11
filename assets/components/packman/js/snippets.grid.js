
TP.grid.Snippets = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-snippets'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'snippet/getList'
        }
        ,action: 'snippet/getList'
        ,fields: ['id','name','assets_path','core_path']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: _('packman.snippet')
            ,dataIndex: 'name'
            ,width: 250
        },{
            header: _('packman.assets_path')
            ,dataIndex: 'assets_path'
            ,width: 300
        },{
            header: _('packman.core_path')
            ,dataIndex: 'core_path'
            ,width: 300
        }]
        ,tbar: [{
            text: _('packman.snippet_add')
            ,handler: this.addSnippet
            ,scope: this
        }]
    });
    TP.grid.Snippets.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'name'}]);
};
Ext.extend(TP.grid.Snippets,TP.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: _('packman.snippet_remove')
            ,handler: this.remove.createDelegate(this,[{
                title: _('packman.snippet_remove')
                ,text: _('packman.snippet_remove_confirm')
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
        title: _('packman.snippet_add')
        ,frame: true
        ,id: 'tp-window-snippet-add'
        ,fields: [{
            xtype: 'tp-combo-snippet'
            ,fieldLabel: _('packman.snippet')
            ,description: _('packman.snippet_desc')
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
            ,fieldLabel: _('packman.assets_path')
            ,description: _('packman.assets_path_desc')
            ,value: '{assets_path}components/mycomponent/'
            ,width: 300
        },{
            xtype: 'textfield'
            ,name: 'core_path'
            ,id: 'tp-snippet-core-path'
            ,fieldLabel: _('packman.core_path')
            ,description: _('packman.core_path_desc')
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
            MODx.msg.alert(_('error'),_('packman.snippet_err_ns'));
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