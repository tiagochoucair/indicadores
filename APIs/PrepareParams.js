/**
 * Created by egaviria on 05/05/2015.
 */




var PrepareParams = function(){
    this.params = {
        ano: null,
        mes: null,
        fechaInicio: null,
        fechaFin: null,
        analista:null
    };
};


PrepareParams.prototype.prepare = function(ano, mes){

    var feb = 28;
    if(ano%4==0) feb = 29;
    var dias = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.params.ano= ano;
    this.params.mes= mes;
    this.params.fechaInicio= formater.vsprintf("%s-%s-%s", [ano, mes, "1"]);
    this.params.fechaFin= formater.vsprintf("%s-%s-%s", [ano, mes, dias[mes-1]]);

    return this.params;

};

module.exports = PrepareParams;