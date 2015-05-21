/*
 * Created by egaviria on 07/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("btnExport").style.display = "block";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    //var formatter = new google.visualization.ArrowFormat();
    //formatter.format(data, 2); // Apply formatter to second columna


    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });

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

    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Seleccione El Servicio");
    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",false,true,"Todos","Seleccione el Cliente");

    addDynamicFilters("filtroCliente_div");
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



    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroServicio, filtroCliente).
        bind(filtroCliente, tableChart).
        // Draw the dashboard
        draw(data);
        

}

