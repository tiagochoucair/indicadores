/**
 * Created by egaviria on 15/05/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    /**
     *
     * @param <String> classText
     * @param <String>idText
     */
    function addDynamicDiv(element,classText, idText) {
        var list = document.getElementById(element);
        list.innerHTML = list.innerHTML + '<div class=' + classText  + '> <div id=' + idText + '></div></div>';
    }


    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",false,true,"Todos", "Cliente");
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Servicio");
    var filtroValor = filters("CategoryFilter","filtroValor_div","ValorHora",false,false,"Todos","Valor Por Hora");

    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption,label){
        var filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'horizontal',
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label}
            }
        });

        return filter;
    }


    function addDynamicFilters(idText) {
        var list = document.getElementById('dashboard_div');
        list.innerHTML = list.innerHTML + '<div id=' + idText  + ' style="float:left; padding-left: 30px;"' + '> </div>';
    }

    addDynamicFilters("filtroCliente_div");
    addDynamicFilters("filtroServicio_div");
    addDynamicFilters("filtroValor_div");


    var chartCiudadHoras = charts("BarChart","chart1_div",
        "Horas",
        "Porcentage","Ciudad","decimal",400,"horizontal");
    addDivCharts("col-sm-6","chart1_div" );
    var chartServicioHoras  = charts("BarChart","chart2_div",
        "Indices IF / IOP POR CARGO",
        "Porcentage","Servicio","decimal",400,"horizontal");
    addDivCharts("col-sm-6","chart2_div" );


    /**
     *
     * @param <String> classText
     * @param <String>idText
     */
    function addDivCharts(classText, idText) {
        var list = document.getElementById('charts');
        list.innerHTML = list.innerHTML + '<div class=' + classText  + '> <div id=' + idText + '></div></div>';
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


    addDynamicDiv("charts","col-sm-12","TableChart_div");

    //Instantiate and draw our chart, passing in some options.
    google.visualization.events.addListener(tableChart, 'ready', function (){
    var dt = tableChart.getDataTable();
    var gca = new GoogleChartAdapter();

    var groupedDataClienteHoras = groupDataSumIngresos([0]);
    var groupedDataServicioHora = groupDataSumIngresos([1]);

    function groupDataSumIngresos(groupColumn) {
        var groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
            column: 3,
            type: 'number',
            label: 'Horas',
            aggregation: google.visualization.data.sum
        }]);

        return groupedDataTable;
    }


        chartCiudadHoras.setDataTable(groupedDataClienteHoras);
        chartCiudadHoras.draw();
        chartServicioHoras.setDataTable(groupedDataServicioHora);
        chartServicioHoras.draw();

    });
    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCliente,filtroServicio).
        bind(filtroServicio, filtroValor).
        bind(filtroValor, tableChart).
        // Draw the dashboard
        draw(data);

}