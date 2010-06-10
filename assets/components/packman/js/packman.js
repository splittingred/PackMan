var TP = function(config) {
    config = config || {};
    TP.superclass.constructor.call(this,config);
};
Ext.extend(TP,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('tp',TP);

var TP = new TP();



 TP.grid.LocalGrid = function(config) {
     config = config || {};
     TP.grid.LocalGrid.superclass.constructor.call(this,config);
 };
 Ext.extend(TP.grid.LocalGrid,MODx.grid.LocalGrid,{
    getData: function() {
        var s = this.getStore();
        var ct = s.getCount();
        var rs = this.config.encodeByPk ? {} : [];
        var r;
        for (var j=0;j<ct;j++) {
            r = s.getAt(j).data;
            r.menu = null;
            if (this.config.encodeAssoc) {
               rs[r[this.config.encodeByPk || 'id']] = r;
            } else {
               rs.push(r);
            }
        }

        return rs;
    }
 });