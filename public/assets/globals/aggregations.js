/**
 * Created by egaviria on 08/05/2015.
 */

function Aggregation(){};
/**
 * @param {Array<Object>} filters
 * @param {string number} Object.value
 * @param {number} Object.column
 * @param {function(Array<number>)} rowAggregation
 * @param {function(rowAggregation, accumulatedValue)} colAggregation
 * @param {Array<number>=} cols
 * @param {Array<number>=} values
 */
Aggregation.prototype.customAggregation = function(dataTable, filters, rowAggregation, colAggregation, cols, values){
    var rowsIndex = dataTable.getFilteredRows(filters);
    var aggregatedValue = 0;
    var cols = cols || [];
    var values = values || [];

    rowsIndex.forEach(function(rowIndex){
        var colsValues = [];
        cols.forEach(function(colIndex){
            colsValues.push(dataTable.getValue(rowIndex,colIndex));
        });
        aggregatedValue = colAggregation.call({},
            rowAggregation.apply({}, colsValues.concat(values)),
            aggregatedValue);
    });

    return aggregatedValue;
};

Aggregation.prototype.customSum = function(dataTable,filters, rowAggregation, cols, values){
    var sum = this.customAggregation(dataTable,filters, rowAggregation, sumValues, cols, values);
    function sumValues(rowAggregation, accumulatedValue){
        return rowAggregation + accumulatedValue;
    };
    return sum;
};


