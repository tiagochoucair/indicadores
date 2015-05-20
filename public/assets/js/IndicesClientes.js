/**
 * Created by egaviria on 07/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    //var formatter = new google.visualization.ArrowFormat();
    //formatter.format(data, 2); // Apply formatter to second columna
    var aggr = new Aggregation();


    /***
     *
     *  Charts
     */
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });
    var chartServicioIndices= charts("BarChart","chart1_div",
        "Indices IF / IOP POR Servicio",
        "Porcentage","Servicio","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart1_div" );
    var chartClienteIndices = charts("BarChart","chart2_div",
        "Indices IF / IOP POR Cliente",
        "Porcentage","Cliente","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart2_div");
    var chartServicioSumHoras = charts("BarChart","chart3_div",
        "Suma Horas Laborales/Facturables/No Facturables Por Cliente",
        "Cantidad","Cliente","decimal",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A"]);
    addDivCharts("col-sm-6","chart3_div" );
    var chartClienteSumHoras = charts("BarChart","chart4_div",
        "Suma Horas Laborales/Facturables/No Facturables Por Cliente",
        "Cantidad","Servicio","decimal",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A"]);
    addDivCharts("col-sm-6","chart4_div" );
    var chartServicioCampos = charts("BarChart","chart5_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC",
        "Cantidad","Servicio","decimal",400,"horizontal",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-6","chart5_div" );
    var chartClienteCampos = charts("BarChart","chart6_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC",
        "Cantidad","Cliente","decimal",400,"horizontal",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-6","chart6_div" );
    var chartServicioValorHora = charts("BarChart","chart7_div",
        "Suma Valor Hora Por Servicio",
        "Cantidad","Servicio","$#,###.###",400,"horizontal",["#535E80","#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart7_div" );
    var chartClienteValorHora = charts("BarChart","chart8_div",
        "Suma Valor Hora Por Cliente",
        "Cantidad","Cliente","$#,###.###",400,"horizontal",["#535E80","#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart8_div" );

    addDivCharts("col-sm-12","TableChart_div" );


    /**
     *
     * @param <String> classText
     * @param <String>idText
     */
    function addDivCharts(classText, idText) {
        var list = document.getElementById('charts');
        list.innerHTML = list.innerHTML + '<div class=' + classText  + '> <div id=' + idText + '></div></div>';
    }


    function addDynamicFilters(idText) {
        var list = document.getElementById('dashboard_div');
        list.innerHTML = list.innerHTML + '<div id=' + idText  + ' style="float:left; padding-left: 30px;"' + '> </div>';
    }

    addDynamicFilters("filtroCliente_div");
    addDynamicFilters("filtroServicio_div");


    /**
     * @param {string} chartType
     * @param {string} containerId
     * @param {string} title
     * @param {string} vAxisTitle
     * @param {string} hAxisTitle
     * @param {string} format
     * @param {string} width
     * @param {string} height
     * @param {string} orientation
     * @param {Array<string>=} colors
     * @returns {google.visualization.ChartWrapper}
     */
    function charts(chartType,containerId, title,vAxisTitle, hAxisTitle,format, height, orientation, colors){
        var chart = new google.visualization.ChartWrapper({
            'chartType': chartType,
            'containerId': containerId,
            'options': {
                title: title,
                vAxis: {title: vAxisTitle, minValue: 0, format: format},
                hAxis: {title: hAxisTitle, format: format},
                height: height,
                colors: colors,
                orientation: orientation
            }
        });
        return chart;
    }


    /**
     *
     * Filtros
     */

    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Seleccione El Servicio");
    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",false,true,"Todos","Seleccione el Cliente");

    /**
     *
     * @param {string} typeFileter
     * @param {string} containerId
     * @param {string} columnLabel
     * @param {boolean} allowTyping
     * @param {boolean} allowMultiple
     * @param {string} caption
     * @returns {google.visualization.ControlWrapper}
     */
    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption, label){
        var filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label}

            }
        });

        return filter;
    }

    google.visualization.events.addListener(tableChart, 'ready', function () {
        var dt = tableChart.getDataTable();
        var gca = new GoogleChartAdapter();

        var clientes = dt.getDistinctValues(4);
        var servicios = dt.getDistinctValues(3);
        var clientesIndicesTable = createIndexesData(dt, 4, clientes, 8, 6, 18, 19, 9, 10);
        var serviciosIndicesTable = createIndexesData(dt, 3, servicios, 8, 6, 18, 19, 9, 10);

        function tableRowsIndices(dt, col, distinctedGroup,
                        horasLaboralesColumn, horasFacturablesColumn,
                        hafColumn, hascColumn, incapColumn, vacColumn){
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

                var ifac = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(horasFacturables, incap, vac, horasLaborales){
                        return horasFacturables/(horasLaborales-incap-vac);
                    },
                    [horasFacturablesColumn, incapColumn, vacColumn], [total]);

                row = [value,ie,iop,ifac];
                rows.push(row);
            });
            return rows;
        }

        function createIndexesData(dataTable, col, distinctedGroup,
                               horasLaboralesColumn, horasFacturablesColumn,
                               hafColumn, hascColumn, incapColumn, vacColumn){
            var groupedDataServicioIndices = new google.visualization.DataTable();
            groupedDataServicioIndices.addColumn("string",dataTable.getColumnLabel(col));
            groupedDataServicioIndices.addColumn("number","IF");
            groupedDataServicioIndices.addColumn("number","IOP");
            groupedDataServicioIndices.addColumn("number","IE");
            groupedDataServicioIndices.addRows(tableRowsIndices(dataTable, col, distinctedGroup,
                horasLaboralesColumn, horasFacturablesColumn,
                hafColumn, hascColumn, incapColumn, vacColumn));
            return groupedDataServicioIndices;
        }



            var servicioValorHoraTable = createValorHoraData(dt, 3, servicios, 8, 6,7, 20);
            var clientesValorHoraTable = createValorHoraData(dt, 4, clientes, 8, 6,7, 20);


        function tableRowsValorHora(dt, col, distinctedGroup,
                                  horasLaboralesColumn, horasFacturablesColumn, horasNoFacturablesColumn,
                                  vHColumn){
            var rows = [];
            distinctedGroup.forEach(function(value){
                var row;
                var totalLaborales = aggr.customSum(dt,[{"column":col, "value":value}],function(horasLaborales){
                    return horasLaborales;
                },[horasLaboralesColumn]);
                var totalFacturable = aggr.customSum(dt,[{"column":col, "value":value}],function(horasFacturables){
                    return horasFacturables;
                },[horasFacturablesColumn]);

                var totalNoFacturable = aggr.customSum(dt,[{"column":col, "value":value}],function(horasFacturables){
                    return horasFacturables;
                },[horasNoFacturablesColumn]);

                var valorHoraxL = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(vh, horasLaborales){
                        return horasLaborales * vh;
                    },
                    [horasLaboralesColumn, vHColumn], [totalLaborales]);
                var valorHoraxF = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(horasFacturables, vh){
                        return horasFacturables * vh;
                    },
                    [horasFacturablesColumn, vHColumn], [totalFacturable]);

                var valorHoraxNF = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(horasNoFacturables, vh){
                        return horasNoFacturables * vh;
                    },
                    [horasNoFacturablesColumn, vHColumn], [totalNoFacturable]);

                row = [value,valorHoraxL,valorHoraxF,valorHoraxNF];
                rows.push(row);

            });
            return rows;
        }

        function createValorHoraData(dataTable, col, distinctedGroup,
                                   horasLaboralesColumn, horasFacturablesColumn,horasNoFacturablesColumn,
                                   vhCol){
            var groupedDataServicioIndices = new google.visualization.DataTable();
            groupedDataServicioIndices.addColumn("string",dataTable.getColumnLabel(col));
            groupedDataServicioIndices.addColumn("number","Total Laborales");
            groupedDataServicioIndices.addColumn("number","Total Facturables");
            groupedDataServicioIndices.addColumn("number","Total No Facturables");
            groupedDataServicioIndices.addRows(tableRowsValorHora(dataTable, col, distinctedGroup,
                horasLaboralesColumn, horasFacturablesColumn,horasNoFacturablesColumn,
                vhCol));
            return groupedDataServicioIndices;
        }

        var groupedDataServicioSumHoras = sumaDeHoras([3]);
        var groupedDataClienteSumHoras = sumaDeHoras([4]);

        /**
         *
         * @param {Array<number>} groupColumn
         */
        function sumaDeHoras(groupColumn) {
            var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 8,
                label: 'Horas Laborales',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 6,
                label: 'Horas Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 7,
                label: 'Horas No Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }
            ]);
            return groupedDataTable;

        }

        var groupedDataServicioCampos = detallesDeHoras([3]);
        var groupedDataClienteCampos = detallesDeHoras([4]);

            /**
             *
             * @param {Array<number>} groupColumn
             */
        function detallesDeHoras(groupColumn){
            var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 9,
                label: 'Incap',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 10,
                label: 'Vac',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 11,
                label: 'Comp',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 12,
                label: 'Preventa',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 13,
                label: 'Induccion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 14,
                label: 'Informacion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 15,
                label: 'Error',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 16,
                label: 'ProyectoChoucair',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 17,
                label: 'HANF',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 18,
                label: 'HAF',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 19,
                label: 'HASC',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }
            ]);

            return groupedDataTable;
        }

        // after grouping, the data will be sorted by column 0, then 1, then 2
        // if you want a different order, you have to re-sort



        chartServicioIndices.setDataTable(gca.convertColsToPercentage(serviciosIndicesTable,[1,2,3]));
        chartClienteIndices.setDataTable(gca.convertColsToPercentage(clientesIndicesTable,[1,2,3]));
        chartClienteValorHora.setDataTable(gca.convertColsToCurrency(clientesValorHoraTable,[1,2,3]));
        chartServicioValorHora.setDataTable(gca.convertColsToCurrency(servicioValorHoraTable,[1,2,3]));
        chartServicioSumHoras.setDataTable(groupedDataServicioSumHoras);
        chartClienteSumHoras.setDataTable(groupedDataClienteSumHoras);
        chartServicioCampos.setDataTable(groupedDataServicioCampos);
        chartClienteCampos.setDataTable(groupedDataClienteCampos);
        chartServicioIndices.draw();
        chartClienteIndices.draw();
        chartServicioSumHoras.draw();
        chartClienteSumHoras.draw();
        chartServicioCampos.draw();
        chartClienteCampos.draw();
        chartClienteValorHora.draw();
        chartServicioValorHora.draw();

    });

    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroServicio, filtroCliente).
        bind(filtroCliente, tableChart).
        // Draw the dashboard
        draw(data);


}

