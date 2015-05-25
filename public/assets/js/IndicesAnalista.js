/**
 * Created by egaviria on 28/04/2015.
 */


function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    var trIndices = new tableRowIndices();


    var chartCiudadIndices = charts("BarChart","chart1_div",
        "Indices IF / IOP POR CIUDAD",
        "Porcentage","Ciudad","#,###%",400,"horizontal");
    addDynamicDivs("charts","col-sm-6","chart1_div" );
    var chartCargoIndices  = charts("BarChart","chart2_div",
        "Indices IF / IOP POR CARGO",
        "Porcentage","Cargo","#,###%",400,"horizontal");
    addDynamicDivs("charts","col-sm-6","chart2_div" );
    var chartAnalistaIndices  = charts("BarChart","chart3_div",
        "Indices IF / IOP POR Analista",
        "Analista","Porcentage","#,###%",800,"vertical");
    addDynamicDivs("charts","col-sm-12","chart3_div" );

    var chartCiudadSUMIngresos  = charts("BarChart","chart4_div",
        "Suma Ingresos/No Ingresos Por Ciudad",
        "Cantidad","Ciudad","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDynamicDivs("charts","col-sm-6","chart4_div" );
    var chartCargoSUMIngresos  = charts("BarChart","chart5_div",
        "Suma Ingresos/No Ingresos Por Cargo",
        "Cantidad","Cargo","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDynamicDivs("charts","col-sm-6","chart5_div");
    var chartAnalistaSUMIngresos  = charts("BarChart","chart6_div",
        "Suma Ingresos/No Ingresos Por Analista",
        "Analista","Cantidad","$#,###.###",800,"vertical",["#5e8043","#F15854"]);
    addDynamicDivs("charts","col-sm-12","chart6_div" );
    var chartCiudadSumHoras  = charts("BarChart","chart7_div",
        "Suma Horas Laborales/Facturables/No Facturables Por Ciudad",
        "Cantidad","Ciudad","decimal",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A"]);
    addDynamicDivs("charts","col-sm-6","chart7_div" );
    var chartCargoSumHoras  = charts("BarChart","chart8_div",
        "Suma Horas Laborales/Facturables/No Facturables Por Cargo",
        "Cantidad","Cargo","decimal",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A"]);
    addDynamicDivs("charts","col-sm-6","chart8_div" );
    var chartAnalistaSumHoras  = charts("BarChart","chart9_div",
        "Suma Horas Laborales/Facturables/No Facturables Por Analista",
        "Analista","Cantidad","decimal",800,"vertical",["#5DA5DA","#60BD68","#FAA43A"]);
    addDynamicDivs("charts","col-sm-12","chart9_div" );
    var chartCiudadCampos  = charts("BarChart","chart10_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC",
        "Cantidad","Ciudad","decimal",400,"horizontal",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDynamicDivs("charts","col-sm-6","chart10_div" );
    var chartCargosCampos  = charts("BarChart","chart11_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC",
        "Cantidad","Cargo","decimal",400,"horizontal",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDynamicDivs("charts","col-sm-6","chart11_div" );
    var chartAnalistaCampos  = charts("BarChart","chart12_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC",
        "Analista","Cantidad","decimal",800,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDynamicDivs("charts","col-sm-12","chart12_div" );


    /**
     *
     * @param <String> classText
     * @param <String>idText
     */
    function addDynamicDivs(divArea,classText, idText) {
        var list = document.getElementById(divArea);
            list.innerHTML = list.innerHTML + '<div class=' + classText  + '> <div id=' + idText + '></div></div>';
    }
    function addDynamicFilters(idText) {
        var list = document.getElementById('dashboard_div');
        list.innerHTML = list.innerHTML + '<div id=' + idText  + ' style="float:left; padding-left: 30px;"' + '> </div>';
    }


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

    function charts(chartType,containerId, title,vAxisTitle, hAxisTitle,format,height, orientation, colors){
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

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });
    addDynamicDivs("charts","col-sm-12","TableChart_div" );

    var filtroCiudad = filters("CategoryFilter","filtroCiudad_div","CiudadN",false,true,"Todos","Ciudad",true);
    var filtroAnalista = filters("CategoryFilter","filtroAnalista_div","AnalistaN",true,false,"Todos", "Analista",true);
    var filtroCargo = filters("CategoryFilter","filtroCargo_div","Cargo",false,true,"Todos","Cargo",true);
    var filtroHoras = filters("CategoryFilter","filtroIE_div","IE",false,true,"Todos","IE",true,[0,0.2,0.3,0.4, 0.5,0.6 ,0.7,0.8,0.9,1]);

    addDynamicFilters("filtroCiudad_div");
    addDynamicFilters("filtroCargo_div");
    addDynamicFilters("filtroAnalista_div");
    addDynamicFilters("filtroIE_div");

    /**
     *
     * @param {string} typeFileter
     * @param {string} containerId
     * @param {string} columnLabel
     * @param {boolean} allowTyping
     * @param {boolean} allowMultiple
     * @param {string} caption
     * @param {string} label
     * @param {boolean} allowNone
     * @returns {google.visualization.ControlWrapper}
     */
    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption,label,allowNone, values){
        var filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowNone': allowNone,
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label},
            'values': values,
            'min-width': 'auto'
            }
        });

        return filter;
    }


    google.visualization.events.addListener(tableChart, 'ready', function () {
        var dt = tableChart.getDataTable();
        var gca = new GoogleChartAdapter();

        var ciudad = dt.getDistinctValues(24);
        var cargo = dt.getDistinctValues(1);
        var analista = dt.getDistinctValues(0);

        var ciudadIndicesTable = trIndices.createIndexesData(dt, 24, ciudad, 6, 15, 18, 19, 7, 8);
        var cargoIndicesTable = trIndices.createIndexesData(dt, 1, cargo, 6, 15, 18, 19, 7, 8);
        var analistaIndicesTable = trIndices.createIndexesData(dt, 0, analista, 6, 15, 18, 19, 7, 8);


        var groupedDataCiudadSumIngresos = groupDataSumIngresos([24]);
        var groupedDataCargoSumIngresos = groupDataSumIngresos([1]);
        var groupedDataAnalistaSumIngresos = groupDataSumIngresos([0]);

        function groupDataSumIngresos(groupColumn) {
            var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 26,
                type: 'number',
                label: 'Ingresos',
                aggregation: google.visualization.data.sum
            }, {
                column: 27,
                label: 'No Ingresos',
                type: 'number' ,
                aggregation: google.visualization.data.sum
            }]);

            return groupedDataTable;
        }

        var groupedDataCiudadSumHoras = groupDataSumHoras([24]);
        var groupedDataCargoSumHoras = groupDataSumHoras([1]);
        var groupedDataAnalistaSumHoras = groupDataSumHoras([0]);

        function groupDataSumHoras(groupColumn) {
            var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 6,
                label: 'Horas Laborales',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 15,
                label: 'Horas Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 16,
                label: 'Horas No Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }
            ]);
            return groupedDataTable;
        }

        var groupedDataCiudadCampos = groupDataDetalleHoras([24]);
        var groupedDataCargosCampos = groupDataDetalleHoras([1]);
        var groupedDataAnalistasCampos = groupDataDetalleHoras([0]);

        function groupDataDetalleHoras(groupColumn) {
            var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 7,
                label: 'Incap',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 8,
                label: 'Vac',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 9,
                label: 'Comp',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 10,
                label: 'Preventa',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 11,
                label: 'Induccion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 12,
                label: 'Informacion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 13,
                label: 'Error',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 14,
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

        var options = {
            bars: 'vertical',
            legend: { position: 'none' }

        };


        chartCiudadIndices.setDataTable(gca.convertColsToPercentage(ciudadIndicesTable,[1,2,3]));
        chartAnalistaIndices.setDataTable(gca.convertColsToPercentage(analistaIndicesTable,[1,2,3]));
        chartCargoIndices.setDataTable(gca.convertColsToPercentage(cargoIndicesTable,[1,2,3]));

        chartCiudadSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataCiudadSumIngresos,[1,2]));
        chartCargoSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataCargoSumIngresos,[1,2]));
        chartAnalistaSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataAnalistaSumIngresos,[1,2]));

        chartCiudadSumHoras.setDataTable(groupedDataCiudadSumHoras);
        chartCargoSumHoras.setDataTable(groupedDataCargoSumHoras);
        chartAnalistaSumHoras.setDataTable(groupedDataAnalistaSumHoras);

        chartCiudadCampos.setDataTable(groupedDataCiudadCampos);
        chartCargosCampos.setDataTable(groupedDataCargosCampos);
        chartAnalistaCampos.setDataTable(groupedDataAnalistasCampos);

        chartCiudadIndices.draw();
        chartCargoIndices.draw();
        chartAnalistaIndices.draw();
        chartCiudadSUMIngresos.draw();
        chartCargoSUMIngresos.draw();
        chartAnalistaSUMIngresos.draw();
        chartCiudadSumHoras.draw();
        chartCargoSumHoras.draw();
        chartAnalistaSumHoras.draw();
        chartCiudadCampos.draw();
        chartCargosCampos.draw();
        chartAnalistaCampos.draw();

    });

    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCiudad, filtroCargo).
        bind(filtroCargo, filtroAnalista).
        bind(filtroAnalista, filtroHoras).
        bind(filtroHoras, tableChart).
        // Draw the dashboard
        draw(data);


}

