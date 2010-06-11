
TP.grid.Directories = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-directories'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'directory/getList'
        }
        ,action: 'directory/getList'
        ,fields: ['id','source','target']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: _('packman.directory_source')
            ,dataIndex: 'source'
            ,width: 300
        },{
            header: _('packman.directory_target')
            ,dataIndex: 'target'
            ,width: 300
        }]
        ,tbar: [{
            text: _('packman.directory_add')
            ,handler: this.addDirectory
            ,scope: this
        }]
    });
    TP.grid.Directories.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create(['id','source','target']);
};
Ext.extend(TP.grid.Directories,TP.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: _('packman.directory_remove')
            ,handler: this.remove.createDelegate(this,[{
                title: _('packman.directory_remove')
                ,text: _('packman.directory_remove_confirm')
            }])
            ,scope: this
        }];
    }
    ,addDirectory: function(btn,e) {
        var r = {};
        if (!this.windows.addDirectory) {
            this.windows.addDirectory = MODx.load({
                xtype: 'tp-window-directory-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addDirectory.fp.getForm().reset();
        this.windows.addDirectory.setValues(r);
        this.windows.addDirectory.show(e.target);
    }
});
Ext.reg('tp-grid-directories',TP.grid.Directories);


TP.window.AddDirectory = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpadir'+Ext.id();
    Ext.applyIf(config,{
        title: _('packman.directory_add')
        ,frame: true
        ,id: 'tp-window-directory-add'
        ,width: 500
        ,fields: [{
            html: _('packman.directory_add_desc')+'<br />'
        },{
            xtype: 'textfield'
            ,name: 'source'
            ,id: 'tp-'+this.ident+'-source'
            ,fieldLabel: _('packman.directory_source')
            ,description: _('packman.directory_source_desc')
            ,value: ''
            ,allowBlank: false
            ,width: 300
        },{
            xtype: 'textfield'
            ,name: 'target'
            ,id: 'tp-'+this.ident+'-target'
            ,fieldLabel: _('packman.directory_target')
            ,description: _('packman.directory_target_desc')
            ,value: ''
            ,allowBlank: false
            ,width: 300
        }]
    });
    TP.window.AddDirectory.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddDirectory,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fls = f.findField('source');
        var flt = f.findField('target');

        if (this.fp.getForm().isValid()) {
            if (this.fireEvent('success',{
                source: fls.getValue()
                ,target: flt.getValue()
            })) {
                this.fp.getForm().reset();
                this.hide();
                return true;
            }
        } else {
            MODx.msg.alert(_('error'),_('packman.directory_err_ns'));
        }
    }
});
Ext.reg('tp-window-directory-add',TP.window.AddDirectory);