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
    this.file = 'Reporte.xlsx';

    this.cols = [
        {label:'CargoN', type:'string', format: null},
        {label:'ServicioN', type:'string', format: null},
        {label:'CiudadClienteN', type:'string', format: null},
        {label:'TotalHorasServicioCargo', type:'number', format: null},
        {label:'IngresosServicioCargo', type:'number', format: "currency"},
        {label:'PromedioValorHora', type:'number', format: "currency"},
        {label:'TotalHorasCargo', type:'number', format: null},
        {label:'IndiceServicioCargo', type:'number', format: "percentage"},
        {label:'TotalHorasServicioCiudad', type:'number', format: null}
    ];
};
/*
 *  @private
 *
 */

ServicioHorasCargoCiudad.prototype.saveDataXls = function(jsonData){

    var xls = json2xls(jsonData);
    fs.writeFileSync(this.file, xls, 'binary');
    return fs.readFileSync(this.file);
    
};
ServicioHorasCargoCiudad.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConverter.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConverter.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.HorasServicioCargoCiudad, params, callback);
};


module.exports = ServicioHorasCargoCiudad;