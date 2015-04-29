/**
 * Created by egaviria on 24/04/2015.
 */

var numeral = require('./numeral.min.js');

var GoogleChartAdapter = function(){

};

var formatValue = function(value, format){
    var formatedValue;

    switch(format){
        case "currency":
            var num = numeral(value);
            numeral.defaultFormat('$0,0.00');
            formatedValue = num.format();
            break;
        default:
            formatedValue = null;
    }

    return formatedValue;
};

GoogleChartAdapter.prototype.formatRow = function(cols, row){
    var self = this;
    var formatedRow = {"c":[]};
    cols.forEach(function(col){
        var value = row[col.label];
        formatedRow.c.push({"v":value,"f": formatValue(value, col.format)});
    });
    return formatedRow;
};

GoogleChartAdapter.prototype.formatRows= function(servicio, data) {
    var formatedData = [];
   console.log(data);
    if (!!data) {
        data.forEach(function (row) {
            formatedData.push(this.formatRow(servicio.cols, row));
        }, this);
    }
    return formatedData;
};

GoogleChartAdapter.prototype.getFormatedData = function(servicio, data){
    var self = this;
    var formatedData = {"cols": servicio.cols, "rows": self.formatRows(servicio, data)};
    return formatedData;
};

module.exports = GoogleChartAdapter;