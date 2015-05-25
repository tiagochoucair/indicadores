/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var CurrencyConversion = require('./CurrencyConverter.js');
var json2xls = require('../node_modules/json2xls/lib/json2xls.js');
var fs = require('fs');
var connection = DBConnection.getConnection();

var ServicioUltimaFechaReporteXAnalista = function(){
    this.file = 'UltimaFechaReporteXAnalista.xlsx';

    this.cols = [
        {label:'Fecha', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'HorasReportadas', type:'number', format: null},
        {label:'HorasF', type:'number', format: null},
        {label:'HorasNF', type:'number', format: null},
        {label:'HoraAdicionalF', type:'number', format: null},
        {label:'HoraAdicionalNF', type:'number', format: null},
        {label:'HoraAdicionalSC', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */

ServicioUltimaFechaReporteXAnalista.prototype.saveDataXls = function(jsonData){

    var xls = json2xls(jsonData);
    fs.writeFileSync(this.file, xls, 'binary');
    return fs.readFileSync(this.file);
    
};


ServicioUltimaFechaReporteXAnalista.prototype.getResults = function(callback,ano,mes){

    var params = null;
    DBConnection.prepare(SQLQuery.UltimaFechaReporteXAnalista, params, callback);
};


module.exports = ServicioUltimaFechaReporteXAnalista;

