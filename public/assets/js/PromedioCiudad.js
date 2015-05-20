/**
 * Created by egaviria on 28/04/2015.
 */

;function draw(jsonData){
    console.log(jsonData);
    var gca = new GoogleChartAdapter();


    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // We omit "var" so that programmaticSlider is visible to changeRange.
   var filtroCiudad = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'filtroCiudad_div',
        'options': {
            'filterColumnLabel': 'CiudadN',
            'ui': {'labelStacking': 'vertical', 'allowTyping': false, 'allowMultiple': false, 'caption': 'Todos',
                'label': 'Ciudad'}
        }
    });

   var filtroServicio = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'filtroServicio_div',
        'options': {
            'filterColumnLabel': 'ServicioN',
            'ui': {'labelStacking': 'vertical', 'allowTyping': false, 'allowMultiple': true, 'caption': 'Todos',
                'label': 'Servicio'}

        }
    });

    var dynamicChart  = new google.visualization.ChartWrapper({
        'chartType': 'BubbleChart',
        'containerId': 'chart1_div',
        'options': {
            title : document.getElementById("ServicioSelect").value,
            vAxis: {title: "Cantidad"},
            hAxis: {title: "Servicios Por Ciudad"},
            'height': 900
        }
    });

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });

    addDivCharts("col-sm-12","chart1_div" );
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

     //Instantiate and draw our chart, passing in some options.
    dashboard.bind(filtroCiudad, filtroServicio);
    dashboard.bind([filtroCiudad, filtroServicio], dynamicChart);
    dashboard.draw(data, {is3D: true});

    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCiudad, filtroServicio).
        bind(filtroServicio, tableChart).
        // Draw the dashboard
        draw(data);
}