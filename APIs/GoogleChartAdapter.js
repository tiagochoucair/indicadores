/**
 * Created by egaviria on 24/04/2015.
 */

var numeral = require('./numeral.min.js');

var GoogleChartAdapter = function(){
    this.formatCurrency = formatCurrency;
    this.itemDataToCurrency = itemDataToCurrency;
    this.convertColsToCurrency = convertColsToCurrency;

     function formatCurrency(value){
        var num = numeral(value);
        numeral.defaultFormat('$0,0.00');
        return num.format();
    }
    /**
     *
     * @param {Object} itemData
     * @param {string|number} itemData.value
     * @param {string} itemData.format
     */
    function itemDataToCurrency(itemData){
        itemData.format = this.formatCurrency(itemData.value);
    }

    /**
     *
     * @param {DataTable} datatable
     * @param {Array<number>} cols
     */
    function convertColsToCurrency(datatable, cols){
        var rows = datatable['rows'];
        rows.forEach(function(rowCols){
            rowCols['c'].forEach(function(itemData, i){
                if (cols.indexOf(i) >= 0) {
                    this.itemDataToCurrency(itemData);
                }
            });
        });
        datatable['rows'] = rows;
        return datatable;
    }
};




GoogleChartAdapter.prototype.formatValue = function(value, format){
    var formatedValue;

    switch(format){
        case "currency":
            formatedValue = this.formatCurrency(value);
            break;
        case "percentage":
            var num = numeral(value);
            numeral.defaultFormat('0.0%');
            formatedValue = num.format();
            break;
        default:
            formatedValue = null;
    }

    return formatedValue;
};

GoogleChartAdapter.prototype.getFormatedValue = function(value,format){
    var formatedValue;

    switch(format) {
        case "date":
            formatedValue = new Date(value);
            break;
        default:
            formatedValue = value;

    }
    return formatedValue;
}

GoogleChartAdapter.prototype.formatRow = function(cols, row){
    var self = this;
    var formatedRow = {"c":[]};
    cols.forEach(function(col){
        var value = this.getFormatedValue(row[col.label], col.format);
        formatedRow.c.push({"v":value,"f": this.formatValue(value, col.format)});
    }, this);
    return formatedRow;
};

GoogleChartAdapter.prototype.formatRows= function(servicio, data) {
    var formatedData = [];
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