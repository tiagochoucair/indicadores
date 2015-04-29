/**
 * Created by egaviria on 23/04/2015.
 */

var http = require('http');
var url = require('url');

var Router = function(){
    this.Url;
};

Router.prototype.SelecionaURL = function(url){

    console.log(url);

};

// Index
app.get('/Index', function(request, response) { });

// PromedioCiudad
app.get('/PromedioCiudad', function(request, response) { });

// Create a new run
app.get('/TotalCiudades', function(request, response) { });

// Show run
app.post('/runs/:id', function(request, response) { });

// Edit run
app.post('/runs/:id/edit', function(request, response) { });

// Update run
app.put('/runs/:id', function(request, response) { });

// Delete run
app.delete('/runs/:id', function(request, response) { });

module.exports = Router;

