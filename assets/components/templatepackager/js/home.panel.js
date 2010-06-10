TP.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        id: 'tp-panel-home'
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'build'
        }
        ,border: false
        ,baseCls: 'modx-formpanel'
        ,fileUpload: true
        ,items: [{
            html: '<h2>'+_('templatepackager')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,border: true
            ,items: [{
                title: _('templatepackager')
                ,draggable: false
                ,layout: 'form'
                ,labelWidth: 200
                ,border: false
                ,bodyStyle: 'padding: 14px;'
                ,items: [{
                    html: '<p>'+_('templatepackager.intro_msg')+'</p>'
                    ,border: false
                },MODx.PanelSpacer,{
                    xtype: 'textfield'
                    ,fieldLabel: 'Category Name'
                    ,name: 'category'
                    ,id: 'tp-category-name'
                    ,value: 'MyTemplate'
                },{
                    xtype: 'textfield'
                    ,inputType: 'file'
                    ,name: 'readme'
                    ,fieldLabel: _('templatepackager.readme')
                    ,description: _('templatepackager.readme_desc')
                    ,width: 300
                },{
                    xtype: 'textfield'
                    ,inputType: 'file'
                    ,name: 'license'
                    ,fieldLabel: _('templatepackager.license')
                    ,description: _('templatepackager.license_desc')
                    ,width: 300
                },{
                    xtype: 'textfield'
                    ,name: 'version'
                    ,fieldLabel: _('templatepackager.version')
                    ,value: '1.0'
                },{
                    xtype: 'textfield'
                    ,name: 'release'
                    ,fieldLabel: _('templatepackager.release')
                    ,value: 'alpha1'
                }]
            },{
                title: 'Templates'
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: '<p>'+'Please select the Templates you want to package. The script will automatically package in any assigned Template Variables as well.'+'</p>'
                    ,border: false
                },{
                    xtype: 'tp-grid-templates'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('templatepackager.chunks')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: '<p>'+'Please select Chunks.'+'</p>'
                    ,border: false
                },{
                    xtype: 'tp-grid-chunks'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: 'Custom Snippets'
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: '<p>'+'Please select Snippets and any files associated with them. <b>Note, you should not use this for Packages downloaded via Package Management.</b> You should use the Packages tab for those.'+'</p>'
                    ,border: false
                },{
                    xtype: 'tp-grid-snippets'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('templatepackager.subpackages')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: '<p>'+'Please select any Packages you want added.'+'</p>'
                    ,border: false
                },{
                    xtype: 'tp-grid-packages'
                    ,preventRender: true
                    ,template: 0
                }]
            }]
        }]
        ,listeners: {
            'beforeSubmit': {fn:this.beforeSubmit,scope:this}
            ,'success': {fn:this.success,scope:this}
        }
    });
    TP.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(TP.panel.Home,MODx.FormPanel,{
    beforeSubmit: function(o) {
        Ext.apply(o.form.baseParams,{
            templates: Ext.getCmp('tp-grid-templates').encode()
            ,chunks: Ext.getCmp('tp-grid-chunks').encode()
            ,snippets: Ext.getCmp('tp-grid-snippets').encode()
            ,packages: Ext.getCmp('tp-grid-packages').encode()
        });
    }
    ,success: function(o) {
        if (o.result.success) {
            var name = o.result.message;
            location.href = TP.config.connector_url+'?action=build&download='+name;

            Ext.getCmp('tp-btn-export').setDisabled(false);
            Ext.getCmp('tp-grid-templates').getStore().commitChanges();
            Ext.getCmp('tp-grid-chunks').getStore().commitChanges();
            Ext.getCmp('tp-grid-snippets').getStore().commitChanges();
            Ext.getCmp('tp-grid-packages').getStore().commitChanges();
        }
    }
});
Ext.reg('tp-panel-home',TP.panel.Home);