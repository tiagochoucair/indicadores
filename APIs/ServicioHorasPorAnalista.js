/**
 * Created by egaviria on 30/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var CurrencyConversion = require('./CurrencyConverter.js');

var ServicioHorasPorAnalista = function(){

    this.cols = [
        {label:'Fecha', type:'date', format: 'date'},
        {label:'Analista', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'HorasFacturables', type:'number', format: null},
        {label:'HorasNoFacturables', type:'number', format: null},
        {label:'HorasRegistradas', type:'number', format: null},
        {label:'Incap', type:'number', format: null},
        {label:'Vac', type:'number', format: null},
        {label:'Comp', type:'number', format: null},
        {label:'Preventa', type:'number', format: null},
        {label:'Induccion', type:'number', format: null},
        {label:'Informacion', type:'number', format: null},
        {label:'Error', type:'number', format: null},
        {label:'ProyectoChoucair', type:'number', format: null},
        {label:'HorasAdicionalesNF', type:'number', format: null},
        {label:'HorasAdicionalesF', type:'number', format: null},
        {label:'HorasAdicionalesSC', type:'number', format: null},
        {label:'FechaLaboral', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */
ServicioHorasPorAnalista.prototype.getResults = function(callback,ano,mes,analista){

    var params = [
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.HorasPorAnalista, params, callback);
};


module.exports = ServicioHorasPorAnalista;