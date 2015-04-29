/**
 * Created by egaviria on 23/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var formater = require('../node_modules/sprintf-js/src/sprintf.js');
var connection = DBConnection.getConnection();

var ServicioPromedioCiudad = function(){
    this.ano;
    this.mes;
    this.fechaInicio;
    this.fechaFin;

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
    var feb = 28;
    if(ano%4==0)
        feb = 29;
    var dias = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.ano= ano;
    this.mes= mes;
    this.fechaInicio= formater.vsprintf("%s-%s-%s", [ano, mes, "1"]);
    this.fechaFin= formater.vsprintf("%s-%s-%s", [ano, mes, dias[mes-1]]);
};

ServicioPromedioCiudad.prototype.getResults = function(ano, mes, callback){
    this.prepareParams(ano, mes);
    var params = [
        new DBPreparedParams('ano',this.ano,'number'),
        new DBPreparedParams('mes',this.mes,'number'),
        new DBPreparedParams('fechaInicio',this.fechaInicio,'string'),
        new DBPreparedParams('fechaFin',this.fechaFin,'string')
    ];
    DBConnection.prepare(SQLQuery.PromedioServicioCiudad, params, callback);
};


module.exports = ServicioPromedioCiudad;