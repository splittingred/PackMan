
TP.grid.Chunks = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'tp-grid-chunks'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'chunk/getList'
            ,template: config.template
        }
        ,action: 'chunk/getList'
        ,fields: ['id','name']
        ,data: []
        ,autoHeight: true
        ,columns: [{
            header: 'Name'
            ,dataIndex: 'name'
            ,width: 250
        }]
        ,tbar: [{
            text: 'Add Chunk'
            ,handler: this.addChunk
            ,scope: this
        }]
    });
    TP.grid.Chunks.superclass.constructor.call(this,config);
    this.propRecord = Ext.data.Record.create([{name: 'id'},{name:'name'}]);
};
Ext.extend(TP.grid.Chunks,MODx.grid.LocalGrid,{
    getMenu: function() {
        return [{
            text: 'Remove Chunk'
            ,handler: this.remove.createDelegate(this,[{
                title: 'Remove Chunk?'
                ,text: 'Are you sure you want to remove this Chunk?'
            }])
            ,scope: this
        }];
    }
    ,addChunk: function(btn,e) {
        var r = {};
        
        if (!this.windows.addChunk) {
            this.windows.addChunk = MODx.load({
                xtype: 'tp-window-chunk-add'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        var rec = new this.propRecord(vs);
                        this.getStore().add(rec);
                    },scope:this}
                }
            });
        }
        this.windows.addChunk.setValues(r);
        this.windows.addChunk.show(e.target);
    }
});
Ext.reg('tp-grid-chunks',TP.grid.Chunks);


TP.window.AddChunk = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpach'+Ext.id();
    Ext.applyIf(config,{
        title: 'Add Chunk'
        ,frame: true
        ,id: 'tp-window-chunk-add'
        ,fields: [{
            xtype: 'tp-combo-chunk'
            ,fieldLabel: 'Chunk'
            ,name: 'chunk'
            ,hiddenName: 'chunk'
            ,id: 'tp-'+this.ident+'-chunk'
            ,allowBlank: false
            ,pageSize: 20
        }]
    });
    TP.window.AddChunk.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.AddChunk,MODx.Window,{
    submit: function() {
        var f = this.fp.getForm();
        var fld = f.findField('chunk');

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
            MODx.msg.alert(_('error'),'Please select a Chunk.');
        }
    }
});
Ext.reg('tp-window-chunk-add',TP.window.AddChunk);

TP.combo.Chunk = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'chunk'
        ,hiddenName: 'chunk'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: false
        ,listWidth: 300
        ,url: MODx.config.connectors_url+'element/chunk.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    TP.combo.Chunk.superclass.constructor.call(this,config);
};
Ext.extend(TP.combo.Chunk,MODx.combo.ComboBox);
Ext.reg('tp-combo-chunk',TP.combo.Chunk);