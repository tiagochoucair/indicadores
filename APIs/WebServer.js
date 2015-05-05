var http = require('http');
var url = require('url');
var ServicioPromedioCiudad = require('./ServicioPromedioCiudad.js');
var ServicioHorasCargoCiudad = require('./ServicioHorasCargoCiudad.js');
var ServicioIndicesAnalista = require('./ServicioIndicesAnalista.js');
var GoogleChartAdapter = require('./GoogleChartAdapter.js');
var ServicioIdNombreAnalista = require('./ServicioIdNombreAnalista.js');
var ServicioHorasPorAnalista = require('./ServicioHorasPorAnalista.js');
var PrepareParams = require('./PrepareParams.js');


var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var mes = parsedUrl.query.mes;
    var ano = parsedUrl.query.ano;
    var analista=parsedUrl.query.analista;
    var servicio;
    var parametros;

    if (/^\/api\/PromedioCiudad/.test(req.url)) {
        servicio = new ServicioPromedioCiudad();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/HorasCargoCiudad/.test(req.url)) {
        servicio = new ServicioHorasCargoCiudad();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IndicesAnalista/.test(req.url)) {
        servicio = new ServicioIndicesAnalista();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IdNombreAnalista/.test(req.url)) {
        servicio = new ServicioIdNombreAnalista();
        servicio.getResults(awriteIdNombreAnalista(servicio),ano,mes);
    }
    if (/^\/api\/HorasPorAnalista/.test(req.url)) {
        servicio = new ServicioHorasPorAnalista();
        servicio.getResults(writeData(servicio),analista);
    }

    function prepareParams (ano, mes, analista){

    }


    function writeData(servicio){
        return function(data){
            var Charts = new GoogleChartAdapter();
            var formatedData = Charts.getFormatedData(servicio,data);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': "*"});
            res.end(JSON.stringify(formatedData));
        }
    }

    function writeIdNombreAnalista(servicio){
        return function(data){
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': "*"});
            res.end(JSON.stringify(data));
        }
    }

});
server.listen(Number(process.argv[2]));
