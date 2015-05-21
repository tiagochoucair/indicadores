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
    this.file = 'Reporte.xlsx';

    this.cols = [
        {label:'AnalistaN', type:'string', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'IE', type:'number', format: "percentage"},
        {label:'IOP', type:'number', format: "percentage"},
        {label:'IFs', type:'number', format: "percentage"},
        {label:'Analista', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'Incap', type:'number', format: null},
        {label:'Vac', type:'number', format: null},
        {label:'Comp', type:'number', format: null},
        {label:'Preventa', type:'number', format: null},
        {label:'Induccion', type:'number', format: null},
        {label:'Informacion', type:'number', format: null},
        {label:'Error', type:'number', format: null},
        {label:'ProyectoChoucair', type:'number', format: null},
        {label:'HorasFacturables', type:'number', format: null},
        {label:'HorasNoFacturables', type:'number', format: null},
        {label:'HANF', type:'number', format: null},
        {label:'HAF', type:'number', format: null},
        {label:'HASC', type:'number', format: null},
        {label:'CargoID', type:'number', format: null},
        {label:'HorasRegistradas', type:'number', format: null},
        {label:'SueldoPromedio', type:'number', format: null},
        {label:'Ciudad', type:'number', format: null},
        {label:'CiudadN', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'Ingresos', type:'number', format: "currency"},
        {label:'NoIngresos', type:'number', format: "currency"}


    ];
};
/*
 *  @private
 *
 */
ServicioIndicesAnalista.prototype.saveDataXls = function(jsonData){

    var xls = json2xls(jsonData);
    fs.writeFileSync(this.file, xls, 'binary');
    return fs.readFileSync(this.file);
    
};
ServicioIndicesAnalista.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.IndicesAnalistasServicio, params, callback);
};


module.exports = ServicioIndicesAnalista;

