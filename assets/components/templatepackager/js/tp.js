var TP = function(config) {
    config = config || {};
    TP.superclass.constructor.call(this,config);
};
Ext.extend(TP,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('tp',TP);

var TP = new TP();