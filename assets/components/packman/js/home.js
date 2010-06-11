Ext.onReady(function() {
    MODx.load({ xtype: 'tp-page-home'});
});

TP.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        formpanel: 'tp-panel-home'
        ,id: 'tp-home'
        ,buttons: [{
            text: _('packman.profile_save')
            ,handler: this.saveProfile
            ,scope: this
            ,id: 'tp-btn-profile-save'
            ,hidden: true
        },{
            xtype: 'tbseparator'
            ,id: 'tp-btn-profile-save-sp'
            ,hidden: true
        },{
            text: _('packman.profile_remove')
            ,handler: this.removeProfile
            ,scope: this
            ,id: 'tp-btn-profile-remove'
            ,hidden: true
        },{
            xtype: 'tbseparator'
            ,id: 'tp-btn-profile-remove-sp'
            ,hidden: true
        },{
            xtype: 'tp-combo-profile'
            ,id: 'tp-combo-profile'
        },{
            text: _('packman.export')
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
Ext.extend(TP.page.Home,MODx.Component,{
    windows: {}
    ,saveProfile: function(btn,e) {
        var data = this.prepareProfile();
        
        MODx.Ajax.request({
            url: TP.config.connector_url
            ,params: {
                action: 'profile/update'
                ,id: TP.profileLoaded
                ,data: data
            }
            ,listeners: {
                'success':{fn:function(r) {
                    MODx.msg.alert(_('success'),_('packman.profile_saved'));
                },scope:this}
            }
        });
    }
    ,removeProfile: function(btn,e) {
        MODx.msg.confirm({
            url: TP.config.connector_url
            ,title: _('packman.profile_remove')
            ,text: _('packman.profile_remove_confirm')
            ,params: {
                action: 'profile/remove'
                ,id: TP.profileLoaded
            }
            ,listeners: {
                'success':{fn:function(r) {
                    var cb = Ext.getCmp('tp-combo-profile');
                    cb.store.load();
                    cb.reset();
                    this.resetProfile();
                },scope:this}
            }
        });
    }

    ,resetProfile: function() {
        Ext.getCmp('tp-panel-home').getForm().reset();
        Ext.getCmp('tp-home-header').update('<h2>'+_('packman')+'</h2>');

        Ext.getCmp('tp-grid-templates').store.removeAll();
        Ext.getCmp('tp-grid-chunks').store.removeAll();
        Ext.getCmp('tp-grid-snippets').store.removeAll();
        Ext.getCmp('tp-grid-plugins').store.removeAll();
        Ext.getCmp('tp-grid-packages').store.removeAll();
        Ext.getCmp('tp-grid-directories').store.removeAll();
        TP.profileLoaded = 0;

        Ext.getCmp('tp-btn-profile-save').hide();
        Ext.getCmp('tp-btn-profile-save-sp').hide();
        Ext.getCmp('tp-btn-profile-remove').hide();
        Ext.getCmp('tp-btn-profile-remove-sp').hide();
    }


    ,prepareProfile: function() {
        var vs = {};
        vs.info = Ext.getCmp('tp-panel-home').getForm().getValues();
        vs.templates = Ext.getCmp('tp-grid-templates').getData();
        vs.chunks = Ext.getCmp('tp-grid-chunks').getData();
        vs.snippets = Ext.getCmp('tp-grid-snippets').getData();
        vs.plugins = Ext.getCmp('tp-grid-plugins').getData();
        vs.packages = Ext.getCmp('tp-grid-packages').getData();
        vs.directories = Ext.getCmp('tp-grid-directories').getData();
        return Ext.util.JSON.encode(vs);
    }
    ,createProfile: function(cb) {
        var r = {};
        r.data = this.prepareProfile();

        if (!this.windows.createProfile) {
            this.windows.createProfile = MODx.load({
                xtype: 'tp-window-profile-create'
                ,record: r
                ,listeners: {
                    'success': {fn:function(vs) {
                        cb.store.load({
                            callback: function() {
                                var rs = vs.a.result.object;
                                cb.setValue(rs.id);
                                this.switchProfile(rs.id,rs.name);
                            }
                            ,scope: this
                        });
                    },scope:this}
                }
            });
        }
        this.windows.createProfile.setValues(r);
        this.windows.createProfile.show(cb.el.dom);
    }

    ,switchProfile: function(id,name) {
        Ext.getCmp('tp-home-header').update('<h2>'+_('packman')+' - '+_('profile')+': '+name+'</h2>');
        TP.profileLoaded = id;
        Ext.getCmp('tp-btn-profile-save').show();
        Ext.getCmp('tp-btn-profile-save-sp').show();
        Ext.getCmp('tp-btn-profile-remove').show();
        Ext.getCmp('tp-btn-profile-remove-sp').show();
    }

    ,loadProfile: function(v) {
        this.resetProfile();
        MODx.Ajax.request({
            url: TP.config.connector_url
            ,params: {
                action: 'profile/get'
                ,id: v
            }
            ,listeners: {
                'success':{fn:function(r) {
                    var p = Ext.getCmp('tp-panel-home');
                    p.getForm().setValues(r.object.data.info);

                    var d = [];
                    this.switchProfile(v,r.object.name);


                    if (r.object.templates) {
                        d = Ext.decode(r.object.templates);
                        Ext.getCmp('tp-grid-templates').getStore().loadData(d);
                    }

                    if (r.object.chunks) {
                        d = Ext.decode(r.object.chunks);
                        Ext.getCmp('tp-grid-chunks').getStore().loadData(d);
                    }

                    if (r.object.snippets) {
                        d = Ext.decode(r.object.snippets);
                        Ext.getCmp('tp-grid-snippets').getStore().loadData(d);
                    }

                    if (r.object.plugins) {
                        d = Ext.decode(r.object.plugins);
                        Ext.getCmp('tp-grid-plugins').getStore().loadData(d);
                    }

                    if (r.object.packages) {
                        d = Ext.decode(r.object.packages);
                        Ext.getCmp('tp-grid-packages').getStore().loadData(d);
                    }

                    if (r.object.directories) {
                        d = Ext.decode(r.object.directories);
                        Ext.getCmp('tp-grid-directories').getStore().loadData(d);
                    }

                },scope:this}
            }
        });
    }
});
Ext.reg('tp-page-home',TP.page.Home);


TP.combo.Profile = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'profile'
        ,hiddenName: 'profile'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: true
        ,listWidth: 300
        ,emptyText: _('packman.profile_select')
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'profile/getList'
        }
    });
    TP.combo.Profile.superclass.constructor.call(this,config);
    this.on('select',this.onSel);
};
Ext.extend(TP.combo.Profile,MODx.combo.ComboBox,{
    onSel: function(cb,rec,idx) {
        var v = cb.getValue();
        if (v == 'CNEW' || v == '-') {
            cb.reset();
        }
        if (v == 'CNEW') {
            Ext.getCmp('tp-home').createProfile(cb);
        } else if (v != '-') {
            Ext.getCmp('tp-home').loadProfile(v);
        }
    }

});
Ext.reg('tp-combo-profile',TP.combo.Profile);


TP.window.CreateProfile = function(config) {
    config = config || {};
    this.ident = config.ident || 'tpproc'+Ext.id();
    Ext.applyIf(config,{
        title: _('packman.profile_create')
        ,frame: true
        ,url: TP.config.connector_url
        ,baseParams: {
            action: 'profile/create'
        }
        ,id: 'tp-window-profile-create'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'data'
            ,id: 'tp-'+this.ident+'-data'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('packman.name')
            ,description: _('packman.profile_name_desc')
            ,name: 'name'
            ,id: 'tp-'+this.ident+'-name'
            ,width: 300
            ,allowBlank: false
        },{
            xtype: 'textarea'
            ,fieldLabel: _('packman.description')
            ,description: _('packman.profile_description_desc')
            ,name: 'description'
            ,id: 'tp-'+this.ident+'-description'
            ,width: 300
        }]
    });
    TP.window.CreateProfile.superclass.constructor.call(this,config);
};
Ext.extend(TP.window.CreateProfile,MODx.Window,{
});
Ext.reg('tp-window-profile-create',TP.window.CreateProfile);
