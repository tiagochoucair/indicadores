/**
 * Created by egaviria on 04/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));


   var filtroHoras = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroHoras_div',
        'options': {
            'filterColumnLabel': 'HorasRegistradas',
            'ui': {'caption': 'Todos'},
            'minValue': 0,
            'maxValue': 20
        }
    });

    function addDynamicFilters(idText) {
        var list = document.getElementById('dashboard_div');
        list.innerHTML = list.innerHTML + '<div id=' + idText  + ' style="float:left; padding-left: 30px;"' + '> </div>';
    }

    addDynamicFilters("filtroHoras_div");


    var calendar = new google.visualization.ChartWrapper({
        'chartType': 'Calendar',
        'containerId': 'calendar_div',
        'options': {
            title: document.getElementById("ServicioSelect").value,
            vAxis: {title: "Calendario"},
            hAxis: {title: "Horas Por Fecha"},
            height: 500,
            colorAxis: {
                minValue: 0,
                maxValue: 20
            }
        },
        'view': {'columns': [0, 5]}
    });

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        'options': {
            height: 500
        }
    });

    addDivCharts("col-sm-12","calendar_div" );
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


    dashboard.bind(filtroHoras, calendar);
    dashboard.bind(filtroHoras, tableChart);
    // Instantiate and draw our chart, passing in some options.
    dashboard.draw(data);
}

