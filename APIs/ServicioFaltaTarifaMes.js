/**
 * Created by egaviria on 14/05/2015.
 */
/**
 * Created by egaviria on 30/04/2015.
 */
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();

var ServicioFaltaTarifaMes = function(){

};

ServicioFaltaTarifaMes.prototype.getResults = function(callback, ano, mes){
    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.FaltaTarifaMes, params, callback);
};



module.exports = ServicioFaltaTarifaMes;