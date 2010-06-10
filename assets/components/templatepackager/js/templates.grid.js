
TP.grid.Templates = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-templates'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'tv/getList'
            ,template: config.template
        }
        ,action: 'tv/getList'
        ,fields: ['id','name','directory']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Name'
            ,dataIndex: 'name'
            ,width: 250
        },{
            header: 'Directory'
            ,dataIndex: 'directory'
            ,width: 400
        }]
        ,tbar: [{
            text: 'Add Template'
            ,handler: this.addTemplate
            ,scope: this
        }]
    });
    TP.grid.Templates.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'templatename'}]);
};
Ext.extend(TP.grid.Templates,MODx.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: 'Remove Template'
            ,handler: this.remove.createDelegate(this,[{
                title: 'Remove Template?'
                ,text: 'Are you sure you want to remove this Template?'
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
        title: 'Add Template'
        ,frame: true
        ,id: 'tp-window-template-add'
        ,fields: [{
            xtype: 'tp-combo-template'
            ,fieldLabel: 'Template'
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
            ,fieldLabel: _('templatepackager.template_files')
            ,description: _('templatepackager.template_files_desc')
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
            MODx.msg.alert(_('error'),'Please select a Template.');
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