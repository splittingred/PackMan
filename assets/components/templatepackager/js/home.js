Ext.onReady(function() {
    MODx.load({ xtype: 'tp-page-home'});
});

TP.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        formpanel: 'tp-panel-home'
        ,buttons: [{
            text: _('templatepackager.export')
            ,id: 'tp-btn-export'
            ,process: 'build'
            ,method: 'remote'
            ,keys: [{
                key: 's'
                ,alt: true
                ,ctrl: true
            }]
        }]
        ,components: [{
            xtype: 'tp-panel-home'
            ,renderTo: 'tp-panel-home-div'
        }]
    }); 
    TP.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(TP.page.Home,MODx.Component);
Ext.reg('tp-page-home',TP.page.Home);