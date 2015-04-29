/**
 * Created by egaviria on 28/04/2015.
 */
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var connection = DBConnection.getConnection();

var ServicioPromedioCiudad = function(){
    this.id;

    this.cols = [
        {label:'Nombre', type:'string', format: null},
        {label:'Id', type:'number', format: null}
    ];

};
/*
 *  @private
 *
 */

ServicioPromedioCiudad.prototype.getResults = function(id, callback){
      var params = [
        new DBPreparedParams('id',this.id,'number')
    ];
    DBConnection.prepare(SQLQuery.getCargos, params, callback);
};


module.exports = ServicioPromedioCiudad;