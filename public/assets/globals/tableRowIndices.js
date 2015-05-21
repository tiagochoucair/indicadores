


function tableRowIndices(){

};


tableRowIndices.prototype.createIndexesData = function (dataTable, col, distinctedGroup,
                               horasLaboralesColumn, horasFacturablesColumn,
                               hafColumn, hascColumn, incapColumn, vacColumn){
            var groupedDataServicioIndices = new google.visualization.DataTable();
            groupedDataServicioIndices.addColumn("string",dataTable.getColumnLabel(col));
            groupedDataServicioIndices.addColumn("number","IF");
            groupedDataServicioIndices.addColumn("number","IOP");
            groupedDataServicioIndices.addColumn("number","IE");
            groupedDataServicioIndices.addRows(this.tableRowsIndices(dataTable, col, distinctedGroup,
                horasLaboralesColumn, horasFacturablesColumn,
                hafColumn, hascColumn, incapColumn, vacColumn));
            return groupedDataServicioIndices;
        };


tableRowIndices.prototype.tableRowsIndices = function (dt, col, distinctedGroup,
                    horasLaboralesColumn, horasFacturablesColumn,
                    hafColumn, hascColumn, incapColumn, vacColumn){
  		var aggr = new Aggregation();
        var rows = [];
        distinctedGroup.forEach(function(value){
            var row = [];
            var total = aggr.customSum(dt,[{"column":col, "value":value}],function(horasLaborales){
                    return horasLaborales;
                },[horasLaboralesColumn]);
            var ie = aggr.customSum(dt,[{"column":col, "value":value}],
                function(horasFacturables, horasLaborales){
                    return horasFacturables/horasLaborales;
                },
                [horasFacturablesColumn], [total]);
            var iop = aggr.customSum(dt,[{"column":col, "value":value}],
                function(horasFacturables, haf, hasc, horasLaborales){
                    return (horasFacturables-haf-hasc)/horasLaborales;
                },
                [horasFacturablesColumn, hafColumn, hascColumn], [total]);
            var ifac = aggr.customSum(dt,[{"column":col, "value":value}],
                function(horasFacturables, incap, vac, horasLaborales){
                    return horasFacturables/(horasLaborales-incap-vac);
                },
                [horasFacturablesColumn, incapColumn, vacColumn], [total]);

            row = [value,ie,iop,ifac];
            rows.push(row);
        });
        return rows;
    };
