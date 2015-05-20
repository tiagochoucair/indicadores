/**
 * Created by egaviria on 28/04/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    addDynamicDiv("col-sm-4","chart1_div");
    addDynamicDiv("col-sm-4","chart2_div");
    addDynamicDiv("col-sm-4","chart3_div");
    addDynamicDiv("col-sm-4","chart4_div");
    addDynamicDiv("col-sm-4","chart5_div");
    addDynamicDiv("col-sm-4","chart6_div");
    addDynamicDiv("col-sm-12","TableChart_div");

    /**
     *
     * @param <String> classText
     * @param <String>idText
     */
    function addDynamicDiv(classText, idText) {
        var list = document.getElementById('charts');
        list.innerHTML = list.innerHTML + '<div class=' + classText  + '> <div id=' + idText + '></div></div>';
    }


    var filtroCargo = filters("CategoryFilter","filtroCargo_div","CargoN",false,true,"Todos","Cargo");
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","ServicioN",false,true,"Todos","Servicio");
    var filtroCiudad = filters("CategoryFilter","filtroCiudad_div","CiudadClienteN",false,true,"Todos","Ciudad");

    function addDynamicFilters(idText) {
        var list = document.getElementById('dashboard_div');
        list.innerHTML = list.innerHTML + '<div id=' + idText  + ' style="float:left; padding-left: 30px;"' + '> </div>';
    }

    addDynamicFilters("filtroCiudad_div");
    addDynamicFilters("filtroCargo_div");
    addDynamicFilters("filtroServicio_div");


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

    var chartCiudadHoras = charts("BarChart","chart1_div",
        "Totales de Horas Por Ciudad",
        "Horas","Ciudad","decimal",400,"horizontal");

    var chartCargoHoras = charts("BarChart","chart2_div",
        "Totales de Horas Por Cargo",
        "Horas","Cargo","decimal",400,"horizontal");

    var chartServicioHoras = charts("BarChart","chart3_div",
        "Totales de Horas Por Servicio",
        "Horas","Servicio","decimal",400,"horizontal");

    var chartCiudadIngesos = charts("BarChart","chart4_div",
        "Total Ingresos Por Ciudad",
        "Ingresos","Ciudad","$#,###.###",400,"horizontal",["#5e8043"]);

    var chartCargoIngesos = charts("BarChart","chart5_div",
        "Total Ingresos Por Cargo",
        "Ingresos","Cargo","$#,###.###",400,"horizontal",["#5e8043"]);

    var chartServicioIngesos = charts("BarChart","chart6_div",
        "Total Ingresos Por Servicio",
        "Ingresos","Servicio","$#,###.###",400,"horizontal",["#5e8043"]);

    function charts(chartType,containerId, title,vAxisTitle, hAxisTitle,format, height, orientation,  colors){
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


    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });

    google.visualization.events.addListener(tableChart, 'ready', function () {
        var dt = tableChart.getDataTable();
        var gca = new GoogleChartAdapter();

        var groupedDataCiudadHoras = groupDataHoras([2]);
        var groupedDataCargoHoras = groupDataHoras([0]);
        var groupedDataServicioHoras = groupDataHoras([1]);
        function groupDataHoras(groupColumn) {
            var groupedDataTableHoras = google.visualization.data.group(dt, groupColumn, [{
                column: 3,
                label: 'Total Horas',
                aggregation: google.visualization.data.sum,
                type: 'number'

            }]);
            return groupedDataTableHoras;
        }

        var groupedDataCiudadIngresos = groupDataIngresos([2]);
        var groupedDataCargoIngresos = groupDataIngresos([0]);
        var groupedDataServicioIngresos = groupDataIngresos([1]);
        function groupDataIngresos(groupColumn) {
            var groupedDataTableIngresos = google.visualization.data.group(dt, groupColumn, [{
                column: 4,
                label: 'Total Ingesos',
                aggregation: google.visualization.data.sum,
                type: 'number'

            }]);

            return groupedDataTableIngresos;
        }

        chartCiudadHoras.setDataTable(groupedDataCiudadHoras);
        chartServicioHoras.setDataTable(groupedDataServicioHoras);
        chartCargoHoras.setDataTable(groupedDataCargoHoras);
        chartCiudadIngesos.setDataTable(gca.convertColsToCurrency(groupedDataCiudadIngresos,[1]));
        chartServicioIngesos.setDataTable(gca.convertColsToCurrency(groupedDataServicioIngresos,[1]));
        chartCargoIngesos.setDataTable(gca.convertColsToCurrency(groupedDataCargoIngresos,[1]));
        chartCiudadHoras.draw();
        chartCargoHoras.draw();
        chartServicioHoras.draw();
        chartCiudadIngesos.draw();
        chartCargoIngesos.draw();
        chartServicioIngesos.draw();

    });

    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCiudad, filtroCargo).
        bind(filtroCargo,filtroServicio).
        bind(filtroServicio, tableChart).
        // Draw the dashboard
        draw(data);

}