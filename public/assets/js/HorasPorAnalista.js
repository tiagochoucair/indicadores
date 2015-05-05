/**
 * Created by egaviria on 04/05/2015.
 */




;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var table = new google.visualization.Table(document.getElementById('chart_div'));


    var chart = new google.visualization.Calendar(document.getElementById('calendar_div'));


    filtroServicio = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroServicio_div',
        'options': {
            'filterColumnLabel': 'HorasRegistradas',
            'ui': {'caption': 'Todos'},
            'minValue': 0,
            'maxValue': 20
        }
    });

    var calendar  = new google.visualization.ChartWrapper({
        'chartType': 'Calendar',
        'containerId': 'calendar_div',
        'options': {
            title : document.getElementById("ServicioSelect").value,
            vAxis: {title: "Calendario"},
            hAxis: {title: "Horas Por Fecha"},
            width: 1200,
            height: 900,
            colorAxis: {
                minValue: -12
            }
        },
        'view': {'columns': [0,5]}
    });



    //table.draw(data, {showRowNumber: true});

    dashboard.bind(filtroServicio, calendar);
    // Instantiate and draw our chart, passing in some options.
    dashboard.draw(data);
    table.draw(data, {showRowNumber: true});
}
