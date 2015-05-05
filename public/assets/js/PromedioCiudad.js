/**
 * Created by egaviria on 28/04/2015.
 */

;function draw(jsonData){
    console.log(jsonData);
    var jdata = JSON.stringify(jsonData);
    console.dir(jdata);
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // We omit "var" so that programmaticSlider is visible to changeRange.
    filtroCiudad = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'filtroCiudad_div',
        'label': 'Ciudad',
        'options': {
            'filterColumnLabel': 'CiudadN',
            'ui': {'labelStacking': 'vertical', 'allowTyping': false, 'allowMultiple': false, 'caption': 'Todos'}
        }
    });

    filtroServicio = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'filtroServicio_div',
        'options': {
            'filterColumnLabel': 'ServicioN',
            'ui': {'labelStacking': 'vertical', 'allowTyping': false, 'allowMultiple': true, 'caption': 'Todos'}

        }
    });

    var dynamicChart  = new google.visualization.ChartWrapper({
        'chartType': 'BubbleChart',
        'containerId': 'chart_div',
        'options': {
            title : document.getElementById("ServicioSelect").value,
            vAxis: {title: "Cantidad"},
            hAxis: {title: "Servicios Por Ciudad"},
            'width': 1200,
            'height': 900
        }
    });

    // Instantiate and draw our chart, passing in some options.
    dashboard.bind(filtroCiudad, filtroServicio);
    dashboard.bind([filtroCiudad, filtroServicio], dynamicChart);
    dashboard.draw(data, {is3D: true});
}