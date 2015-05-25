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
    var trIndices = new tableRowIndices();
    var trValorHora = new tableRowValorHora();

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
                hAxis: {title: hAxisTitle, minValue: 0, format: format},
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

    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Servicio");
    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",false,true,"Todos","Cliente");

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
        //
        var clientesIndicesTable = trIndices.createIndexesData(dt, 4, clientes, 8, 6, 18, 19, 9, 10);
        var serviciosIndicesTable = trIndices.createIndexesData(dt, 3, servicios, 8, 6, 18, 19, 9, 10);

        var servicioValorHoraTable = trValorHora.createValorHoraData(dt, 3, servicios, 8, 6,7, 20);
        var clientesValorHoraTable = trValorHora.createValorHoraData(dt, 4, clientes, 8, 6,7, 20);


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
        bind(filtroCliente, filtroServicio).
        bind(filtroServicio, tableChart).
        // Draw the dashboard
        draw(data);


}

