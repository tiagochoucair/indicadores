var SQLQuery = {

        PromedioServicioCiudad:" SELECT A.*, PromedioValorHora*A.CantidadTotalHoras as IgresosServicio\
                                    FROM\
                                    (SELECT\
                                    CA.Nombre as ServicioN,\
                                    DA.Nombre as CiudadN,\
                                    AA.Ciudad,\
                                    CAST(SUM(AA.TotalHoras * BA.ValorHora * AA.ConversionPeso)/SUM(AA.TotalHoras) as Decimal(8,2)) as PromedioValorHora,\
                                    SUM(AA.TotalHoras) as CantidadTotalHoras\
                                    FROM\
                                    (SELECT A.*, B.Pais, B.Ciudad,\
                                    CASE B.Pais\
                                    WHEN 2 THEN 770.56\
                                    WHEN 3 THEN 2413.8\
                                    ELSE 1\
                                    END as ConversionPeso\
                                    FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE A.Fecha >= CAST(@fechaInicio AS DATE) AND A.Fecha <= CAST(@fechaFin AS DATE) AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio) A\
                                    LEFT JOIN dbo.Cliente as B ON A.Cliente = B.ID) AA\
                                    LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                                    LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                                    LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID AND AA.Pais = DA.Pais\
                                    WHERE BA.Mes = @mes AND BA.Ano = @ano\
                                    GROUP BY CA.Nombre, DA.Nombre, AA.Ciudad) A",


    HorasServicioCargoCiudad: "SELECT\
                                    DA.CargoN,\
                                    DA.ServicioN,\
                                    DA.CiudadClienteN,\
                                    DA.TotalHorasServicioCargo,\
                                    DB.PromedioValorHora*DA.TotalHorasServicioCargo as IngresosServicioCargo,\
                                    DB.PromedioValorHora as PromedioValorHora,\
                                    DA.TotalHorasCargo,\
                                    DA.IndiceServicioCargo,\
                                    DB.CantidadTotalHoras as TotalHorasServicioCiudad\
                                    FROM\
                                    (SELECT\
                                    CA.CargoN,\
                                    CA.ServicioN,\
                                    CA.Servicio,\
                                    CA.CiudadClienteN,\
                                    CA.CiudadCliente,\
                                    CA.TotalHorasServicioCargo,\
                                    CB.TotalHorasCargo,\
                                    CAST(CA.TotalHorasServicioCargo/CB.TotalHorasCargo as Decimal(6,2)) as IndiceServicioCargo\
                                    FROM\
                                    (SELECT\
                                    BA.*,\
                                    BB.Nombre as CargoN,\
                                    BC.Nombre as ServicioN,\
                                    BD.Nombre as CiudadClienteN\
                                    FROM\
                                    (SELECT SUM(AA.TotalHoras) as TotalHorasServicioCargo, AA.Ciudad as CiudadCliente, AA.Servicio, AB.Cargo FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE A.Fecha >= CAST(@fechaInicio AS DATE) AND A.Fecha <= CAST(@fechaFin AS DATE) AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                                    LEFT JOIN dbo.Analista as AB ON AA.Analista = AB.ID\
                                    GROUP BY AA.Ciudad, AA.Servicio, AB.Cargo) BA\
                                    LEFT JOIN dbo.Cargo as BB ON BA.Cargo = BB.ID\
                                    LEFT JOIN dbo.Servicio as BC ON BA.Servicio = BC.ID\
                                    LEFT JOIN dbo.Ciudad as BD ON BA.CiudadCliente = BD.ID) CA\
                                    LEFT JOIN\
                                    (SELECT SUM(AA.TotalHoras) as TotalHorasCargo, AA.Ciudad as CiudadCliente, AB.Cargo FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE A.Fecha >= CAST(@fechaInicio AS DATE) AND A.Fecha <= CAST(@fechaFin AS DATE) AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                                    LEFT JOIN dbo.Analista as AB ON AA.Analista = AB.ID\
                                    GROUP BY AA.Ciudad, AB.Cargo) CB\
                                    ON CB.Cargo = CA.Cargo AND CB.CiudadCliente = CA.CiudadCliente) DA\
                                    LEFT JOIN (SELECT\
                                    CA.Nombre as ServicioN,\
                                    CA.ID as Servicio,\
                                    DA.Nombre as CiudadN,\
                                    DA.ID as Ciudad,\
                                    CAST(SUM(AA.TotalHoras * BA.ValorHora)/SUM(AA.TotalHoras) as Decimal(8,2)) as PromedioValorHora,\
                                    SUM(AA.TotalHoras) as CantidadTotalHoras\
                                    FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE A.Fecha >= CAST(@fechaInicio AS DATE) AND A.Fecha <= CAST(@fechaFin AS DATE) AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                                    LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                                    LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                                    LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID\
                                    WHERE BA.Mes = @mes AND BA.Ano = @ano\
                                    GROUP BY CA.Nombre, DA.Nombre, CA.ID, DA.ID) DB\
                                    ON DA.CiudadCliente = DB.Ciudad AND DA.Servicio = DB.Servicio\
                                    ORDER BY DA.CiudadClienteN, DA.CargoN",


    IndicesAnalistasServicio:
        "SELECT B.Nombre as AnalistaN, C.Nombre as Cargo,\
        CAST(IIF(HorasLaborales = 0, HorasFacturables/1, HorasFacturables/HorasLaborales) as DECIMAL(6,2)) as IOP,\
        CAST(IIF(HorasLaborales = 0 OR (HorasLaborales-(Incap+Vac)) = 0, HorasFacturables/1, HorasFacturables/(HorasLaborales-(Incap+Vac))) as DECIMAL(6,2)) as 'IF',\
        A.*\
        FROM\
        (SELECT A.Analista,\
        SUM(A.HorasLaborales*A.FechaLaboral) as HorasLaborales,\
        SUM(A.Incap) as Incap,\
        SUM(A.Vac) as Vac,\
        SUM(A.HorasFacturables) as HorasFacturables,\
        SUM(A.HorasAdicionalesNF) as HANF,\
        SUM(A.HorasAdicionalesF) as HAF,\
        SUM(A.HorasAdicionalesSC) as HASC\
        FROM\
        (SELECT A.Fecha, A.Analista, MIN(A.HorasLaborales) as HorasLaborales,\
        SUM(A.HorasF) as HorasFacturables,\
        SUM(A.HorasNF*Incap) as Incap,\
        SUM(A.HorasNF*Vac) as Vac,\
        SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
        SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
        SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
            A.FechaLaboral\
        FROM\
        (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
            IIF(D.Fecha IS NULL AND A.Actividad NOT IN (6,8,10,12), 1, 0) as FechaLaboral,\
            IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
            IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
        IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
        IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
        IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC\
        FROM\
        (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora,\
        SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
        SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
        FROM dbo.DetalleReporteDia A\
        LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
        WHERE A.Fecha >= CAST('2015-04-01' AS DATE)\
        AND A.Fecha <= CAST('2015-04-30' AS DATE)\
        GROUP BY A.Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora) A\
        LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
        LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
        LEFT JOIN dbo.DiaNoLaboral D ON C.Pais = D.Pais AND CAST(D.Fecha as DATE) = A.Fecha\
        LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
        GROUP BY A.Fecha, A.Analista, A.FechaLaboral) A\
        GROUP BY A.Analista) A\
        LEFT JOIN dbo.Analista B ON A.Analista = B.ID\
        LEFT JOIN dbo.Cargo C ON B.Cargo = C.ID\
        ORDER BY IOP DESC, C.Nombre, B.Nombre"

};


module.exports = SQLQuery;

