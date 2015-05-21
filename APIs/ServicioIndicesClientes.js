/**
 * Created by egaviria on 07/05/2015.
 */

/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var CurrencyConversion = require('./CurrencyConverter.js');
var connection = DBConnection.getConnection();

var ServicioIndicesClientes = function(){
    this.file = 'Reporte.xlsx';

    this.cols = [
        {label:'IE', type:'number', format: "percentage"},
        {label:'IOP', type:'number', format: null},
        {label:'IFs', type:'number', format: "percentage"},
        {label:'Servicio', type:'string', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Analistas', type:'number', format: null},
        {label:'HorasF', type:'number', format: null},
        {label:'HorasNF', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'Incap', type:'number', format: null},
        {label:'Vac', type:'number', format: null},
        {label:'Comp', type:'number', format: null},
        {label:'Preventa', type:'number', format: null},
        {label:'Induccion', type:'number', format: null},
        {label:'Informacion', type:'number', format: null},
        {label:'Error', type:'number', format: null},
        {label:'ProyectoChoucair', type:'number', format: null},
        {label:'HANF', type:'number', format: null},
        {label:'HAF', type:'number', format: null},
        {label:'HASC', type:'number', format: null},
        {label:'ValorHora', type:'number', format: "currency"},
        {label:'ValorHoraAdicional', type:'number', format: "currency"}

    ];
};
/*
 *  @private
 *
 */

ServicioIndicesClientes.prototype.saveDataXls = function(jsonData){

    var xls = json2xls(jsonData);
    fs.writeFileSync(this.file, xls, 'binary');
    return fs.readFileSync(this.file);
    
};
ServicioIndicesClientes.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.IndicesServiciosClientes, params, callback);
};


module.exports = ServicioIndicesClientes;
