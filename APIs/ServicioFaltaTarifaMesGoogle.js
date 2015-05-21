/**
 * Created by egaviria on 14/05/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();

var ServicioFaltaTarifaMesGoogle = function(){
    this.file = 'Reporte.xlsx';
    
    this.cols = [

        {label:'Cliente', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'ValorHora', type:'number', format: "currency"},
        {label:'Horas', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */
ServicioFaltaTarifaMesGoogle.prototype.saveDataXls = function(jsonData){

    var xls = json2xls(jsonData);
    fs.writeFileSync(this.file, xls, 'binary');
    return fs.readFileSync(this.file);
    
};
ServicioFaltaTarifaMesGoogle.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.FaltaTarifaMes, params, callback);
};


module.exports = ServicioFaltaTarifaMesGoogle;
