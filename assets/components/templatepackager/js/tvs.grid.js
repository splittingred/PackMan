
TP.grid.TVs = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-tvs'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'tv/getList'
            ,template: config.template
        }
        ,action: 'tv/getList'
        ,fields: ['id','name']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Name'
            ,dataIndex: 'name'
            ,width: 250
        }]
        ,tbar: [{
            text: 'Add Template Variable'
            ,handler: this.addTV
            ,scope: this
        }]
    });
    TP.grid.TVs.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'name'}]);
};
Ext.extend(TP.grid.TVs,MODx.grid.LocalGrid,{
    addTV: function(btn,e) {
        var tmp = Ext.getCmp('tp-combo-template');
        var r = {}
        if (tmp) { r.template = tmp.getValue(); }
        
        if (!this.windows.addTV) {
            this.windows.addTV = MODx.load({
                xtype: 'tp-window-tv-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addTV.setValues(r);
        this.windows.addTV.show(e.target);
    }
});
Ext.reg('tp-grid-tvs',TP.grid.TVs);


TP.window.AddTV = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpatv'+Ext.id();
    Ext.applyIf(config,{
        title: 'Add Template Variable'
        ,frame: true
        ,id: 'tp-window-tv-add'
        ,fields: [{
            xtype: 'tp-combo-tv'
            ,fieldLabel: 'TV'
            ,name: 'tv'
            ,hiddenName: 'tv'
            ,id: 'tp-'+this.ident+'-tv'
            ,allowBlank: false
            ,pageSize: 20
        }]
    });
    TP.window.AddTV.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddTV,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('tv');

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
            MODx.msg.alert(_('error'),'Please select a Template Variable.');
        }
    }
});
Ext.reg('tp-window-tv-add',TP.window.AddTV);

TP.combo.TV = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'tv'
        ,hiddenName: 'tv'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'element/tv.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.TV.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.TV,MODx.combo.ComboBox);
Ext.reg('tp-combo-tv',TP.combo.TV);