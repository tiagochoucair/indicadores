/**
 * Created by egaviria on 28/04/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var table = new google.visualization.Table(document.getElementById('chart_div'));

    table.draw(data, {showRowNumber: true});

    // Instantiate and draw our chart, passing in some options.
    dashboard.draw(data);


}