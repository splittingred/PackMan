
TP.grid.Templates = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-templates'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'tv/getList'
        }
        ,action: 'tv/getList'
        ,fields: ['id','name','directory']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: _('packman.template')
            ,dataIndex: 'name'
            ,width: 250
        },{
            header: _('packman.directory')
            ,dataIndex: 'directory'
            ,width: 400
        }]
        ,tbar: [{
            text: _('packman.template_add')
            ,handler: this.addTemplate
            ,scope: this
        }]
    });
    TP.grid.Templates.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'templatename'}]);
};
Ext.extend(TP.grid.Templates,TP.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: _('packman.template_remove')
            ,handler: this.remove.createDelegate(this,[{
                title: _('packman.template_remove')
                ,text: _('packman.template_remove_confirm')
            }])
            ,scope: this
        }];
    }
    ,addTemplate: function(btn,e) {
        var r = {};
        if (!this.windows.addTemplate) {
            this.windows.addTemplate = MODx.load({
                xtype: 'tp-window-template-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addTemplate.setValues(r);
        this.windows.addTemplate.show(e.target);
    }
});
Ext.reg('tp-grid-templates',TP.grid.Templates);


TP.window.AddTemplate = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpatmp'+Ext.id();
    Ext.applyIf(config,{
        title: _('packman.template_add')
        ,frame: true
        ,id: 'tp-window-template-add'
        ,fields: [{
            xtype: 'tp-combo-template'
            ,fieldLabel: _('packman.template')
            ,description: _('packman.template_desc')
            ,name: 'template'
            ,hiddenName: 'template'
            ,id: 'tp-'+this.ident+'-template'
            ,allowBlank: false
            ,pageSize: 20
            ,listeners: {
                'select':{fn:this.selectTemplate,scope:this}
            }
        },{
            xtype: 'textfield'
            ,name: 'directory'
            ,fieldLabel: _('packman.directory')
            ,description: _('packman.template_directory_desc')
            ,value: '{assets_path}templates/mytemplate/'
            ,width: 300
        }]
    });
    TP.window.AddTemplate.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddTemplate,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('template');
        var fls = f.findField('directory');

        if (id != '' && this.fp.getForm().isValid()) {
            if (this.fireEvent('success',{
                id: fld.getValue()
                ,name: fld.getRawValue()
                ,directory: fls.getValue()
            })) {
                this.fp.getForm().reset();
                this.hide();
                return true;
            }
        } else {
            MODx.msg.alert(_('error'),_('packman.template_err_ns'));
        }
    }

    ,selectTemplate: function(cb,nv,ov) {
        var f = this.fp.getForm();
        var v = cb.getRawValue();
        var p = Ext.util.Format.lowercase(v);

        f.findField('directory').setValue('{assets_path}templates/'+p+'/');
    }
});
Ext.reg('tp-window-template-add',TP.window.AddTemplate);

TP.combo.Template = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'template'
        ,hiddenName: 'template'
        ,displayField: 'templatename'
        ,valueField: 'id'
        ,fields: ['id','templatename']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'element/template.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.Template.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.Template,MODx.combo.ComboBox);
Ext.reg('tp-combo-template',TP.combo.Template);