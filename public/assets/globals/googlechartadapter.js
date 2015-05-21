/**
 * Created by egaviria on 07/05/2015.
 */
var GoogleChartAdapter = function(){
    this.formatCurrency = formatCurrency;
    this.itemDataToCurrency = itemDataToCurrency;
    this.convertColsToCurrency = convertColsToCurrency;
    this.formatPercentage = formatPercentage;
    this.itemDataToPercentage = itemDataToPercentage;
    this.convertColsToPercentage = convertColsToPercentage;


    function formatPercentage(value){
        var num = numeral(value);
        numeral.defaultFormat('0.0%');
        return num.format();
    }
    /**
     *
     * @param {Object} itemData
     * @param {string|number} itemData.value
     * @param {string} itemData.format
     */
    function itemDataToPercentage(itemData){
        itemData['f'] = this.formatPercentage(itemData['v']);
    }

    /**
     *
     * @param {DataTable} datatable
     * @param {Array<number>} cols
     */
    function convertColsToPercentage(datatable, cols){

        var datatableJSON = JSON.parse(datatable.toJSON());
        var rows = datatableJSON['rows'];
        var gca = this;

        rows.forEach(function(rowCols){
            rowCols['c'].forEach(function(itemData, i){
                if (cols.indexOf(i) >= 0) {
                    gca.itemDataToPercentage(itemData);
                }
            });
        });
        datatableJSON['rows'] = rows;
        return datatableJSON;
    }


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
        itemData['f'] = this.formatCurrency(itemData['v']);
    }

    /**
     *
     * @param {DataTable} datatable
     * @param {Array<number>} cols
     */
    function convertColsToCurrency(datatable, cols){

        var datatableJSON = JSON.parse(datatable.toJSON());
        var rows = datatableJSON['rows'];
        var gca = this;

        rows.forEach(function(rowCols){
            rowCols['c'].forEach(function(itemData, i){
                if (cols.indexOf(i) >= 0) {
                    gca.itemDataToCurrency(itemData);
                }
            });
        });
        datatableJSON['rows'] = rows;
        return datatableJSON;
    }

};
