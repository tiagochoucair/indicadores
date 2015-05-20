/**
 * Created by egaviria on 23/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var connection = DBConnection.getConnection();
var CurrencyConversion = require('./CurrencyConverter.js');

var ServicioPromedioCiudad = function(){

    this.cols = [
        {label:'ServicioN', type:'string', format: null},
        {label:'CantidadTotalHoras', type:'number', format: null},
        {label:'PromedioValorHora', type:'number', format: "currency"},
        {label:'CiudadN', type:'string', format: null},
        {label:'IgresosServicio', type:'number', format: "currency"}
    ];

};

/*
 *  @private
 *
 */


ServicioPromedioCiudad.prototype.getResults = function(callback, ano, mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.PromedioServicioCiudad, params, callback);
};


module.exports = ServicioPromedioCiudad;