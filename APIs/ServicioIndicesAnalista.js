/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var CurrencyConversion = require('./CurrencyConverter.js');
var connection = DBConnection.getConnection();

var ServicioIndicesAnalista = function(){

    this.cols = [
        {label:'AnalistaN', type:'string', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'IOP', type:'number', format: "percentage"},
        {label:'IF', type:'number', format: "percentage"},
        {label:'Analista', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'Incap', type:'number', format: null},
        {label:'Vac', type:'number', format: null},
        {label:'HorasFacturables', type:'number', format: null},
        {label:'HANF', type:'number', format: null},
        {label:'HAF', type:'number', format: null},
        {label:'HASC', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */
ServicioIndicesAnalista.prototype.prepareParams = function(ano, mes){
    var params = {
        fechaInicio:null,
        fechaFin: null
    };
    var feb = 28;
    if(ano%4==0)
        feb = 29;
    var dias = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    params.fechaInicio = formater.vsprintf("%s-%s-%s", [ano, mes, "1"]);
    params.fechaFin= formater.vsprintf("%s-%s-%s", [ano, mes, dias[mes-1]]);

    return params;
};

ServicioIndicesAnalista.prototype.getResults = function(callback,ano,mes,analista){

    var fechas = this.prepareParams(ano,mes);
    var params = [
        new DBPreparedParams('fechaInicio',fechas.fechaInicio,'string'),
        new DBPreparedParams('fechaFin',fechas.fechaFin,'string'),
        new DBPreparedParams('sol',CurrencyConversion.sol,'number'),
        new DBPreparedParams('dollar',CurrencyConversion.dollar,'number')
    ];
    DBConnection.prepare(SQLQuery.IndicesAnalistasServicio, params, callback);
};


module.exports = ServicioIndicesAnalista;