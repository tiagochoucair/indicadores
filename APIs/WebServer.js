var http = require('http');
var url = require('url');
var ServicioPromedioCiudad = require('./ServicioPromedioCiudad.js');
//var Router = require('./Router.js');
var ServicioHorasCargoCiudad = require('./ServicioHorasCargoCiudad.js');
var ServicioIndicesAnalista = require('./ServicioIndicesAnalista.js');
var GoogleChartAdapter = require('./GoogleChartAdapter.js');

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var mes = parsedUrl.query.mes;
    var ano = parsedUrl.query.ano;
    var servicio ;
    //var routeUrl = new Router();
    //routeUrl.SelecionaURL(parsedUrl.path);

    if (/^\/api\/PromedioCiudad/.test(req.url)) {
        servicio = new ServicioPromedioCiudad();
        servicio.getResults(ano,mes, writeData(servicio));
    }
    if (/^\/api\/HorasCargoCiudad/.test(req.url)) {
        servicio = new ServicioHorasCargoCiudad();
        servicio.getResults(ano,mes, writeData(servicio));
    }
    if (/^\/api\/IndicesAnalista/.test(req.url)) {
        servicio = new ServicioIndicesAnalista();
        servicio.getResults(ano,mes, writeData(servicio));
    }
    function writeData(servicio){
        return function(data){
            var Charts = new GoogleChartAdapter();
            var formatedData = Charts.getFormatedData(servicio,data);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': "*"});
            res.end(JSON.stringify(formatedData));
        }
    }
});
server.listen(Number(process.argv[2]));
