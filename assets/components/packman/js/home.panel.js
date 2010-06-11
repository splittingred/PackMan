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
            html: '<h2>'+_('packman')+'</h2>'
            ,border: false
            ,id: 'tp-home-header'
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,border: true
            ,items: [{
                title: _('packman')
                ,draggable: false
                ,layout: 'form'
                ,labelWidth: 200
                ,border: false
                ,bodyStyle: 'padding: 14px;'
                ,items: [{
                    html: '<p>'+_('packman.intro_msg')+'</p>'
                    ,border: false
                },MODx.PanelSpacer,{
                    xtype: 'textfield'
                    ,fieldLabel: _('packman.package_name')
                    ,description: _('packman.package_name_desc')
                    ,name: 'category'
                    ,id: 'tp-category-name'
                    ,value: _('packman.mypackage')
                },{
                    xtype: 'textfield'
                    ,inputType: 'file'
                    ,name: 'readme'
                    ,fieldLabel: _('packman.readme')
                    ,description: _('packman.readme_desc')
                    ,width: 300
                },{
                    xtype: 'textfield'
                    ,inputType: 'file'
                    ,name: 'license'
                    ,fieldLabel: _('packman.license')
                    ,description: _('packman.license_desc')
                    ,width: 300
                },{
                    xtype: 'textfield'
                    ,name: 'version'
                    ,fieldLabel: _('packman.version')
                    ,description: _('packman.version_desc')
                    ,value: '1.0'
                },{
                    xtype: 'textfield'
                    ,name: 'release'
                    ,fieldLabel: _('packman.release')
                    ,description: _('packman.release_desc')
                    ,value: 'beta1'
                }]
            },{
                title: _('packman.templates')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: _('packman.templates.intro_msg')
                    ,border: false
                },{
                    xtype: 'tp-grid-templates'
                    ,id: 'tp-grid-templates'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('packman.chunks')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: _('packman.chunks.intro_msg')
                    ,border: false
                },{
                    xtype: 'tp-grid-chunks'
                    ,id: 'tp-grid-chunks'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('packman.snippets_custom')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: _('packman.snippets.intro_msg')
                    ,border: false
                },{
                    xtype: 'tp-grid-snippets'
                    ,id: 'tp-grid-snippets'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('packman.plugins')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: _('packman.plugins.intro_msg')
                    ,border: false
                },{
                    xtype: 'tp-grid-plugins'
                    ,id: 'tp-grid-plugins'
                    ,preventRender: true
                    ,template: 0
                }]
            },{
                title: _('packman.subpackages')
                ,bodyStyle: 'padding: 15px;'
                ,items: [{
                    html: '<p>'+_('packman.subpackages.intro_msg')+'</p>'
                    ,border: false
                },{
                    xtype: 'tp-grid-packages'
                    ,id: 'tp-grid-packages'
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
            ,plugins: Ext.getCmp('tp-grid-plugins').encode()
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
            Ext.getCmp('tp-grid-plugins').getStore().commitChanges();
            Ext.getCmp('tp-grid-packages').getStore().commitChanges();
        }
    }
});
Ext.reg('tp-panel-home',TP.panel.Home);