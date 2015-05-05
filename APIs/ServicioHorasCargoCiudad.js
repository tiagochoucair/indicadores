/**
 * Created by egaviria on 23/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var CurrencyConverter = require('./CurrencyConverter.js');
var connection = DBConnection.getConnection();

var ServicioHorasCargoCiudad = function(){

    this.cols = [
        {label:'CargoN', type:'string', format: null},
        {label:'ServicioN', type:'string', format: null},
        {label:'CiudadClienteN', type:'string', format: null},
        {label:'TotalHorasServicioCargo', type:'number', format: null},
        {label:'IngresosServicioCargo', type:'number', format: "currency"},
        {label:'PromedioValorHora', type:'number', format: "currency"},
        {label:'TotalHorasCargo', type:'number', format: null},
        {label:'TotalHorasServicioCiudad', type:'number', format: null},
        {label:'IndiceServicioCargo', type:'number', format: "percentage"}
    ];
};
/*
 *  @private
 *
 */


ServicioHorasCargoCiudad.prototype.getResults = function(callback,ano,mes){
    var fechas = this.prepareParams(ano, mes);
    var params = [
        new DBPreparedParams('ano',fechas.ano,'number'),
        new DBPreparedParams('mes',fechas.mes,'number'),
        new DBPreparedParams('fechaInicio',fechas.fechaInicio,'string'),
        new DBPreparedParams('fechaFin',fechas.fechaFin,'string'),
        new DBPreparedParams('sol',CurrencyConverter.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConverter.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.HorasServicioCargoCiudad, params, callback);
};


module.exports = ServicioHorasCargoCiudad;