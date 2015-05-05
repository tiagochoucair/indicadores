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
        {label:'PromedioValorHora', type:'number', format: null},
        {label:'CiudadN', type:'string', format: null},
        {label:'IgresosServicio', type:'number', format: "currency"}
    ];

};

/*
 *  @private
 *
 */
ServicioPromedioCiudad.prototype.prepareParams = function(ano, mes){
    var params = {
        ano: null,
        mes: null,
        fechaInicio: null,
        fechaFin: null
    };
    var feb = 28;
    if(ano%4==0)
        feb = 29;
    var dias = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    params.ano= ano;
    params.mes= mes;
    params.fechaInicio= formater.vsprintf("%s-%s-%s", [ano, mes, "1"]);
    params.fechaFin= formater.vsprintf("%s-%s-%s", [ano, mes, dias[mes-1]]);

    return params;
};

ServicioPromedioCiudad.prototype.getResults = function(callback, ano, mes){
    var fechas = this.prepareParams(ano,mes);

    var params = [
        new DBPreparedParams('ano',fechas.ano,'number'),
        new DBPreparedParams('mes',fechas.mes,'number'),
        new DBPreparedParams('fechaInicio',fechas.fechaInicio,'string'),
        new DBPreparedParams('fechaFin',fechas.fechaFin,'string'),
        new DBPreparedParams('sol',CurrencyConversion.sol,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.dollar,'double')
    ];
    DBConnection.prepare(SQLQuery.PromedioServicioCiudad, params, callback);
};


module.exports = ServicioPromedioCiudad;