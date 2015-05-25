var SQLQuery = {

        PromedioServicioCiudad:" SELECT A.*, PromedioValorHora*A.CantidadTotalHoras as IgresosServicio\
                                    FROM\
                                    (SELECT\
                                    CA.Nombre as 'ServicioN',\
                                    DA.Nombre as 'CiudadN',\
                                    AA.Ciudad,\
                                    CAST(SUM(AA.TotalHoras * BA.ValorHora * AA.ConversionPeso)/SUM(AA.TotalHoras) as Decimal(8,2)) as PromedioValorHora,\
                                    SUM(AA.TotalHoras) as CantidadTotalHoras\
                                    FROM\
                                    (SELECT A.*, B.Pais, B.Ciudad,\
                                    CASE B.Pais\
                                    WHEN 2 THEN @sol\
                                    WHEN 3 THEN @dollar\
                                    ELSE 1\
                                    END as ConversionPeso\
                                    FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio) A\
                                    LEFT JOIN dbo.Cliente as B ON A.Cliente = B.ID) AA\
                                    LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                                    LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                                    LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID AND AA.Pais = DA.Pais\
                                    WHERE BA.Mes = @mes AND BA.Ano = @ano\
                                    GROUP BY CA.Nombre, DA.Nombre, AA.Ciudad) A",


        HorasServicioCargoCiudad: "SELECT \
                                    DA.CargoN,\
                                    DA.ServicioN,\
                                    DA.CiudadClienteN,\
                                    DA.CiudadCliente,\
                                    DA.TotalHorasServicioCargo,\
                                    DB.PromedioValorHora*DA.TotalHorasServicioCargo*DA.ConversionPeso as IngresosServicioCargo,\
                                    DB.PromedioValorHora*DA.ConversionPeso as PromedioValorHora,\
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
                                    CAST(CA.TotalHorasServicioCargo/CB.TotalHorasCargo as Decimal(6,2)) as IndiceServicioCargo,\
                                    CASE CA.PaisCliente\
                                    WHEN 2 THEN @sol\
                                    WHEN 3 THEN @dollar\
                                    ELSE 1\
                                    END as ConversionPeso\
                                    FROM\
                                    (SELECT\
                                    BA.*,\
                                    BB.Nombre as CargoN,\
                                    BC.Nombre as ServicioN,\
                                    BD.Nombre as CiudadClienteN,\
                                    BD.Pais as PaisCliente\
                                    FROM\
                                    (SELECT SUM(AA.TotalHoras) as TotalHorasServicioCargo,\
                                    CASE AA.Ciudad\
                                    WHEN 9 THEN 1\
                                    ELSE AA.Ciudad\
                                    END as CiudadCliente,\
                                    AA.Servicio, AB.Cargo FROM\
                                    (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                                    LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                                    LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                                    LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                                    LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                                    WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
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
                                    WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
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
                                    WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                                    GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                                    LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                                    LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                                    LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID\
                                    WHERE BA.Mes = @mes AND BA.Ano = @ano\
                                    GROUP BY CA.Nombre, DA.Nombre, CA.ID, DA.ID) DB\
                                    ON DA.CiudadCliente = DB.Ciudad AND DA.Servicio = DB.Servicio",


        IndicesAnalistasServicio:
                            "SELECT A.*, \
                            A.HorasFacturables*B.Promedio as Ingresos,\
                            A.HorasLaborales*IIF(A.IFs < 1 AND A.CargoID NOT IN (7,11,12), 1-A.IFs, 0)*B.Promedio as NoIngresos FROM (\
                            SELECT B.Nombre as AnalistaN, C.Nombre as Cargo,\
                            CAST(IIF(HorasLaborales = 0, HorasFacturables/1, HorasFacturables/HorasLaborales) as DECIMAL(6,2)) as IE,\
                            CAST(IIF(HorasLaborales = 0, (HorasFacturables-(HAF+HASC))/1, (HorasFacturables-(HAF+HASC))/HorasLaborales) as DECIMAL(6,2)) as IOP,\
                            CAST(IIF(HorasLaborales = 0 OR (HorasLaborales-(Incap+Vac)) = 0,\
                            HorasFacturables/1, HorasFacturables/(HorasLaborales-(Incap+Vac))) as DECIMAL(6,2)) as IFs,\
                            A.*,\
                            B.Cargo as CargoID,\
                            A.HorasFacturables+A.HorasNoFacturables as HorasRegistradas,\
                            CASE B.Cargo\
                            WHEN 1 THEN 2300000\
                            WHEN 3 THEN 2500000\
                            WHEN 4 THEN 3300000\
                            WHEN 5 THEN 3700000\
                            WHEN 6 THEN 2300000\
                            WHEN 8 THEN 3200000\
                            ELSE 4000000\
                            END as SueldoPromedio,\
                            B.Ciudad,\
                            D.Nombre as CiudadN,\
                            E.Nombre as Pais\
                            FROM\
                            (SELECT A.Analista,\
                            SUM(A.HorasLaborales*A.FechaLaboral) as HorasLaborales,\
                            SUM(A.Incap) as Incap,\
                            SUM(A.Vac) as Vac,\
                            SUM(A.Comp) as Comp,\
                            SUM(A.Preventa) as Preventa,\
                            SUM(A.Induccion) as Induccion,\
                            SUM(A.Informacion) as Informacion,\
                            SUM(A.Error) as Error,\
                            SUM(A.ProyectoChoucair) as ProyectoChoucair,\
                            SUM(A.HorasFacturables) as HorasFacturables,\
                            SUM(A.HorasNoFacturables) as HorasNoFacturables,\
                            SUM(A.HorasAdicionalesNF) as HANF,\
                            SUM(A.HorasAdicionalesF) as HAF,\
                            SUM(A.HorasAdicionalesSC) as HASC\
                            FROM\
                            (SELECT A.Fecha, A.Analista, MIN(A.HorasLaborales) as HorasLaborales,\
                            SUM(A.HorasF) as HorasFacturables,\
                            SUM(A.HorasNF) as HorasNoFacturables,\
                            SUM(A.HorasNF*Incap) as Incap,\
                            SUM(A.HorasNF*Vac) as Vac,\
                            SUM(A.HorasNF*Comp) as Comp,\
                            SUM(A.HorasNF*Preventa) as Preventa,\
                            SUM(A.HorasNF*Induccion) as Induccion,\
                            SUM(A.HorasNF*Informacion) as Informacion,\
                            SUM(A.HorasNF*Error) as Error,\
                            SUM(A.HorasNF*ProyectoChoucair) as ProyectoChoucair,\
                            SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
                            SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
                            SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
                            A.FechaLaboral\
                            FROM\
                            (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
                            IIF(D.Fecha IS NULL AND A.Actividad NOT IN (6,8,10,12), 1, 0) as FechaLaboral,\
                            IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
                            IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
                            IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
                            IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
                            IIF(E.GrupoActividad = 24,1,0) as Induccion,\
                            IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
                            IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
                            IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
                            IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
                            IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
                            IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC\
                            FROM\
                            (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora,\
                            SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
                            SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
                            FROM dbo.DetalleReporteDia A\
                            LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
                            WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes\
                            GROUP BY A.Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora) A\
                            LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
                            LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
                            LEFT JOIN dbo.DiaNoLaboral D ON C.Pais = D.Pais AND CAST(D.Fecha as DATE) = A.Fecha\
                            LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
                            GROUP BY A.Fecha, A.Analista, A.FechaLaboral) A\
                            GROUP BY A.Analista) A\
                            LEFT JOIN dbo.Analista B ON A.Analista = B.ID\
                            LEFT JOIN dbo.Cargo C ON B.Cargo = C.ID\
                            LEFT JOIN dbo.Ciudad D ON B.Ciudad = D.ID\
                            LEFT JOIN dbo.Pais E ON E.ID = D.Pais\
                            ) A\
                            INNER JOIN (\
                            SELECT A.CargoN, A.CiudadClienteN, A.CiudadCliente, SUM(A.IngresosServicioCargo) as Ingresos,\
                            SUM(A.PromedioValorHora*A.IndiceServicioCargo) as Promedio FROM (\
                            SELECT\
                            DA.CargoN,\
                            DA.ServicioN,\
                            DA.CiudadClienteN,\
                            DA.CiudadCliente,\
                            DA.TotalHorasServicioCargo,\
                            DB.PromedioValorHora*DA.TotalHorasServicioCargo*DA.ConversionPeso as IngresosServicioCargo,\
                            DB.PromedioValorHora*DA.ConversionPeso as PromedioValorHora,\
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
                            CAST(CA.TotalHorasServicioCargo/CB.TotalHorasCargo as Decimal(6,2)) as IndiceServicioCargo,\
                            CASE CA.PaisCliente\
                            WHEN 2 THEN @sol\
                            WHEN 3 THEN @dollar\
                            ELSE 1\
                            END as ConversionPeso\
                            FROM\
                            (SELECT\
                            BA.*,\
                            BB.Nombre as CargoN,\
                            BC.Nombre as ServicioN,\
                            BD.Nombre as CiudadClienteN,\
                            BD.Pais as PaisCliente\
                            FROM\
                            (SELECT SUM(AA.TotalHoras) as TotalHorasServicioCargo,\
                            CASE AA.Ciudad\
                            WHEN 9 THEN 1\
                            ELSE AA.Ciudad\
                            END as CiudadCliente,\
                            AA.Servicio, AB.Cargo FROM\
                            (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                            LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                            LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                            LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                            LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                            WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
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
                            WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
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
                            WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                            GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                            LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                            LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                            LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID\
                            WHERE BA.Mes = @mes AND BA.Ano = @ano\
                            GROUP BY CA.Nombre, DA.Nombre, CA.ID, DA.ID) DB\
                            ON DA.CiudadCliente = DB.Ciudad AND DA.Servicio = DB.Servicio\
                            ) A\
                            GROUP BY A.CargoN, A.CiudadClienteN, A.CiudadCliente\
                            ) B ON A.Cargo = B.CargoN AND B.CiudadCliente = A.Ciudad\
                            ORDER BY IOP DESC, HorasLaborales DESC, AnalistaN",


        IdNombreAnalistas: "select Id, Nombre from dbo.Analista\
            WHERE IsActive = 1\
            ORDER BY Nombre",




        HorasPorAnalista:
            "SELECT A.Fecha, A.Analista, MIN(A.HorasLaborales) as HorasLaborales, \
                SUM(A.HorasF) as HorasFacturables,\
                SUM(A.HorasNF) as HorasNoFacturables,\
                SUM(A.HorasF+A.HorasNF) as HorasRegistradas,\
                SUM(A.HorasNF*Incap) as Incap,\
                SUM(A.HorasNF*Vac) as Vac,\
                SUM(A.HorasNF*Comp) as Comp,\
                SUM(A.HorasNF*Preventa) as Preventa,\
                SUM(A.HorasNF*Induccion) as Induccion,\
                SUM(A.HorasNF*Informacion) as Informacion,\
                SUM(A.HorasNF*Error) as Error,\
                SUM(A.HorasNF*ProyectoChoucair) as ProyectoChoucair,\
                SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
                SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
                SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
                A.FechaLaboral\
                FROM\
                (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
                IIF(D.Fecha IS NULL AND A.Actividad NOT IN (6,8,10,12), 1, 0) as FechaLaboral,\
                IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
                IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
                IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
                IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
                IIF(E.GrupoActividad = 24,1,0) as Induccion,\
                IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
                IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
                IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
                IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
                IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
                IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC\
                FROM\
                (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora,\
                SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
                SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
                FROM dbo.DetalleReporteDia A\
                LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
                WHERE B.Analista = @analista AND A.Fecha > '2014-01-01'\
                GROUP BY A.Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora) A\
                LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
                LEFT JOIN dbo.DiaNoLaboral D ON C.Pais = D.Pais AND CAST(D.Fecha as DATE) = A.Fecha\
                LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
                GROUP BY A.Fecha, A.Analista, A.FechaLaboral\
                ORDER BY A.Fecha DESC",


        IndicesServiciosClientes:
            "WITH \
                        ReporteHorasLaborales (Actividad, Servicio, Cliente, Fecha, Analista, HorasLaborales, HorasF, HorasNF, FechaLaboral, Incap, \
                        Vac, Comp, Preventa, Induccion, Informacion, Error, ProyectoChoucair, HoraAdicionalNF, HoraAdicionalF, HoraAdicionalSC)\
                        AS\
                        (\
                        SELECT A.Actividad, A.Servicio, C.ID as Cliente, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
                        IIF(D.Fecha IS NULL AND A.Actividad NOT IN (6,8,10,12), 1, 0) as FechaLaboral,\
                        IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
                        IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
                        IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
                        IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
                        IIF(E.GrupoActividad = 24,1,0) as Induccion,\
                        IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
                        IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
                        IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
                        IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
                        IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
                        IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC\
                        FROM\
                        (SELECT CAST(A.Fecha as DATE) as Fecha, A.Servicio, B.Analista, A.Proyecto, A.Actividad, A.TipoHora,\
                        SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
                        SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
                        FROM dbo.DetalleReporteDia A\
                        LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
                        WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes\
                        GROUP BY A.Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora, A.Servicio) A\
                        LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
                        LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
                        LEFT JOIN dbo.DiaNoLaboral D ON C.Pais = D.Pais AND CAST(D.Fecha as DATE) = A.Fecha\
                        LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID\
                        ),\
                        ReporteHorasLaboralesAnalistas (Analista, Servicio, Cliente, HorasF, HorasNF, Incap, Vac, Comp, Preventa, Induccion, Informacion, Error, \
                        ProyectoChoucair, HANF, HAF, HASC)\
                        AS\
                        (\
                        SELECT A.Analista, A.Servicio, A.Cliente,\
                        SUM(A.HorasF) as HorasF,\
                        SUM(A.HorasNF) as HorasNF,\
                        SUM(A.Incap) as Incap,\
                        SUM(A.Vac) as Vac,\
                        SUM(A.Comp) as Comp,\
                        SUM(A.Preventa) as Preventa,\
                        SUM(A.Induccion) as Induccion,\
                        SUM(A.Informacion) as Informacion,\
                        SUM(A.Error) as Error,\
                        SUM(A.ProyectoChoucair) as ProyectoChoucair,\
                        SUM(A.HoraAdicionalesNF) as HANF,\
                        SUM(A.HoraAdicionalesF) as HAF,\
                        SUM(A.HoraAdicionalesSC) as HASC\
                        FROM (\
                        SELECT Analista, Servicio, Cliente,\
                        SUM(HorasF) as HorasF,\
                        SUM(HorasNF) as HorasNF,\
                        SUM(Incap*HorasNF) as Incap,\
                        SUM(Vac*HorasNF) as Vac,\
                        SUM(Comp*HorasNF) as Comp,\
                        SUM(Preventa*HorasNF) as Preventa,\
                        SUM(Induccion*HorasNF) as Induccion,\
                        SUM(Informacion*HorasNF) as Informacion,\
                        SUM(Error*HorasNF) as Error,\
                        SUM(ProyectoChoucair*HorasNF) as ProyectoChoucair,\
                        SUM(HoraAdicionalNF*HorasNF) as HoraAdicionalesNF,\
                        SUM(HoraAdicionalF*HorasF) as HoraAdicionalesF,\
                        SUM(HoraAdicionalSC*HorasF) as HoraAdicionalesSC,\
                        FechaLaboral\
                        FROM ReporteHorasLaborales\
                        GROUP BY Analista, Servicio, Cliente, Fecha, FechaLaboral) A\
                        GROUP BY Analista, Servicio, Cliente\
                        )\
                        ,ReporteHorasLaboralesServicio (Servicio, Cliente, Analistas, HorasF, HorasNF, Incap, Vac, Comp, Preventa, Induccion, Informacion, Error, \
                        ProyectoChoucair, HoraAdicionalNF, HoraAdicionalF, HoraAdicionalSC)\
                        AS\
                        (\
                        SELECT Servicio, Cliente,\
                        COUNT(Analista) as Analistas,\
                        SUM(HorasF) as HorasF,\
                        SUM(HorasNF) as HorasNF,\
                        SUM(Incap) as Incap,\
                        SUM(Vac) as Vac,\
                        SUM(Comp) as Comp,\
                        SUM(Preventa) as Preventa,\
                        SUM(Induccion) as Induccion,\
                        SUM(Informacion) as Informacion,\
                        SUM(Error) as Error,\
                        SUM(ProyectoChoucair) as ProyectoChoucair,\
                        SUM(HANF) as HoraAdicionalNF,\
                        SUM(HAF) as HoraAdicionalF,\
                        SUM(HASC) as HoraAdicionalSC\
                        FROM ReporteHorasLaboralesAnalistas\
                        GROUP BY Servicio, Cliente\
                        )\
                        ,TarifasServicioCliente (Cliente, Servicio, ValorHora, ValorHoraAdicional)\
                        AS\
                        (\
                        SELECT Cliente, Servicio,\
                        ValorHora*ConversionPeso as ValorHora,\
                        ValorHoraAdicional*ConversionPeso as ValorHoraAdicional FROM (\
                        SELECT Cliente, Servicio,\
                        CASE B.Pais\
                        WHEN 2 THEN @sol\
                        WHEN 3 THEN @dollar\
                        ELSE 1\
                        END as ConversionPeso,\
                        ValorHora,\
                        ValorHoraAdicional\
                        FROM dbo.Tarifa A\
                        INNER JOIN dbo.Cliente B ON A.Cliente = B.ID\
                        WHERE Mes = @mes AND Ano = @ano) A\
                        )\
                        SELECT\
                        CAST(IIF(HorasLaborales = 0, HorasF/1, HorasF/HorasLaborales) as DECIMAL(6,2)) as IE,\
                        CAST(IIF(HorasLaborales = 0, (HorasF-(HAF+HASC))/1, (HorasF-(HAF+HASC))/HorasLaborales) as DECIMAL(6,2)) as IOP,\
                        CAST(IIF(HorasLaborales = 0 OR (HorasLaborales-(Incap+Vac+Comp)) = 0, HorasF/1, HorasF/(HorasLaborales-(Incap+Vac+Comp))) as DECIMAL(6,2)) as IFs,\
                        A.* FROM (\
                        SELECT D.Nombre as Servicio, C.Nombre as Cliente, A.Analistas, HorasF, HorasNF,\
                        (HorasF-HoraAdicionalF-HoraAdicionalSC)+(HorasNF-HoraAdicionalNF) as HorasLaborales,\
                        Incap, Vac, Comp, Preventa, Induccion, Informacion, Error, ProyectoChoucair, HoraAdicionalNF as HANF, HoraAdicionalF as HAF, HoraAdicionalSC as HASC,\
                        B.ValorHora, B.ValorHoraAdicional\
                        FROM ReporteHorasLaboralesServicio A\
                        LEFT JOIN TarifasServicioCliente B ON A.Cliente = B.Cliente AND A.Servicio = B.Servicio\
                        LEFT JOIN dbo.Cliente C ON A.Cliente = C.ID\
                        LEFT JOIN dbo.Servicio D ON A.Servicio = D.ID\
                        )A",


            FaltaTarifaMes :
                            "SELECT\
                                AA.Cliente, AA.Servicio, ISNULL((AA.ValorHora*AA.ConversionPeso),0) as ValorHora, SUM(AA.Horas) as Horas\
                                from\
                                (select C.Nombre as Cliente, S.Nombre as Servicio, T.ValorHora, SUM(DRD.Horas) as Horas,\
                                CASE P.ID\
                                WHEN 2 THEN 770.56\
                                WHEN 3 THEN 2413.8\
                                ELSE 1\
                                END as ConversionPeso\
                                from [MaxTimeCHC].[dbo].[ReporteDia] RD\
                                inner join [MaxTimeCHC].[dbo].[DetalleReporteDia] DRD on (RD.ID = DRD.ReporteDia)\
                                INNER JOIN [MaxTimeCHC].[dbo].[Proyecto] PR ON (DRD.Proyecto = PR.ID)\
                                INNER JOIN [MaxTimeCHC].[dbo].[Cliente] C ON (C.ID = PR.Cliente)\
                                INNER JOIN [MaxTimeCHC].[dbo].[Servicio] S ON (DRD.Servicio = S.ID)\
                                inner join [MaxTimeCHC].[dbo].[Pais] P ON (C.Pais = P.ID)\
                                LEFT JOIN [MaxTimeCHC].[dbo].[Tarifa] T \
                                ON \
                                (T.Cliente = C.ID AND T.Servicio = S.ID AND T.Ano = year(RD.Fecha) AND T.Mes = MONTH(RD.Fecha))\
                                where year(RD.fecha) = @ano and month(RD.fecha) = @mes and Drd.Facturable = 1\
                                GROUP BY C.Nombre, S.Nombre, T.ValorHora, P.Nombre, P.ID) AA\
                                group by AA.Cliente, AA.Servicio, ValorHora, ConversionPeso",

            MaxTimeReport:
                        "select AA.Sector, AA.Cliente, AA.Pais, AA.Ciudad,Year(AA.Fecha) as Ano, MONTH(AA.Fecha) AS Mes, DAY(AA.Fecha) AS Dia,\
                            AA.Analista, AA.Cedula, AA.Cargo,AA.Proyecto, AA.Servicio,\
                            AA.Facturable,AA.Actividad, AA.GrupoActividad, AA.TipoHora, ISNULL((AA.ValorHora*AA.ConversionPeso),0) as ValorHora,\
                            SUM(AA.Horas) as Horas, AA.Comentario, AA.ValorTotal\
                            from\
                            (select C.Nombre as Cliente, S.Nombre as Servicio, T.ValorHora,DRD.Fecha AS Fecha, SUM(DRD.Horas) as Horas, P.Nombre as Pais, PR.Nombre as Proyecto,\
                            Ciu.Nombre as Ciudad, A.Nombre as Analista,SE.Nombre as Sector, A.Cedula as Cedula, Car.Nombre as Cargo, ACT.Nombre AS Actividad,\
                            GA.Nombre as GrupoActividad, TH.Nombre AS TipoHora, DRD.Comentario, (T.ValorHora * SUM(DRD.Horas)) As ValorTotal,\
                            CASE P.ID\
                            WHEN 2 THEN 770.56 \
                            WHEN 3 THEN 2413.8\
                            ELSE 1\
                            END as ConversionPeso,\
                            case Drd.Facturable\
                            when 0 then 'NO'\
                            when 1 then 'SI'\
                            end as Facturable\
                            from [MaxTimeCHC].[dbo].[DetalleReporteDia] DRD\
                            inner join [MaxTimeCHC].[dbo].[ReporteDia] RD on (RD.ID = DRD.ReporteDia)\
                            inner JOIN [MaxTimeCHC].[dbo].[Proyecto] PR ON (DRD.Proyecto = PR.ID)\
                            inner join [MaxTimeCHC].[dbo].[TipoHora] TH ON (DRD.TipoHora = TH.ID)\
                            inner join [MaxTimeCHC].[dbo].[Actividad] ACT ON (DRD.Actividad = ACT.ID)\
                            inner join [MaxTimeCHC].[dbo].[GrupoActividad] GA on (ACT.GrupoActividad = GA.ID)\
                            inner JOIN [MaxTimeCHC].[dbo].[Cliente] C ON (C.ID = PR.Cliente)\
                            inner JOIN [MaxTimeCHC].[dbo].[Servicio] S ON (DRD.Servicio = S.ID)\
                            inner join [MaxTimeCHC].[dbo].[Pais] P ON (C.Pais = P.ID)\
                            inner join [MaxTimeCHC].[dbo].[Ciudad] CIU on (CIU.ID = C.Ciudad)\
                            inner join [MaxTimeCHC].[dbo].[Analista] A on (RD.Analista = A.ID)\
                            left join [MaxTimeCHC].[dbo].[Sector]  SE on (C.Sector = SE.ID)\
                            inner join [MaxTimeCHC].[dbo].[Cargo] CAR ON (car.ID = A.Cargo)\
                            LEFT JOIN [MaxTimeCHC].[dbo].[Tarifa] T ON (T.Cliente = C.ID AND T.Servicio = S.ID AND T.Ano = year(DRD.Fecha) AND T.Mes = MONTH(DRD.Fecha))\
                            where year(DRD.fecha) = @ano and month(DRD.fecha) = @mes\
                            GROUP BY C.Nombre, S.Nombre, T.ValorHora, P.Nombre, P.ID,P.Nombre, ciu.Nombre, \
                            A.Nombre, Pr.Nombre, Se.Nombre, Drd.Facturable, A.Cedula,Car.Nombre,ACT.Nombre, GA.Nombre, TH.Nombre, Drd.Fecha, Drd.Comentario) AA\
                            group by AA.Cliente, AA.Servicio, ValorHora, ConversionPeso, AA.Pais, AA.Ciudad, AA.Analista, AA.Proyecto, AA.Sector,\
                            AA.Facturable, AA.Cedula, AA.Cargo,AA.Actividad, AA.GrupoActividad, AA.TipoHora, AA.Fecha, AA.Comentario, AA.ValorTotal\
                            order by AA.Cliente, AA.Fecha",


            UltimaFechaReporteXAnalista:
                        "SELECT\
                            CONCAT(YEAR(T.fecha), '-', MONTH(T.FECHA),'-', DAY(T.FECHA)) as Fecha,\
                            T.Pais, T.Cliente, T.Analista,T.Cedula, (T.HorasLaborales*(DAY(GETDATE()) - DBX.DiaNoLaboral)) AS HorasLaborales,\
                            (T.HorasF+T.HorasNF-T.HoraAdicionalF-T.HoraAdicionalNF-T.HoraAdicionalSC)AS HorasReportadas,\
                            T.HorasF, T.HorasNF, T.HoraAdicionalF, T.HoraAdicionalNF, T.HoraAdicionalSC\
                            FROM\
                            (select  max(drd.Fecha) as fecha, P.ID as PaisID,P.Nombre AS Pais,\
                                c.Nombre as Cliente, A.Nombre AS Analista, a.Cedula,C.HorasLaborales,\
                            SUM(IIF(DRD.Facturable = 1, DRD.Horas, 0)) as HorasF,\
                            SUM(IIF(DRD.Facturable = 0, DRD.Horas, 0)) as HorasNF,\
                            SUM(IIF(DRD.TipoHora = 11,1,0)) as HoraAdicionalNF,\
                            SUM(IIF(DRD.TipoHora = 1,1,0)) as HoraAdicionalF,\
                            SUM(IIF(DRD.TipoHora = 2,1,0)) as HoraAdicionalSC\
                            from [MaxTimeCHC].[dbo].[DetalleReporteDia] DRD\
                            inner join [MaxTimeCHC].[dbo].[ReporteDia] RD on (RD.ID = DRD.ReporteDia)\
                            inner JOIN [MaxTimeCHC].[dbo].[Proyecto] PR ON (DRD.Proyecto = PR.ID)\
                            inner JOIN [MaxTimeCHC].[dbo].[Cliente] C ON (C.ID = PR.Cliente)\
                            inner join [MaxTimeCHC].[dbo].[Pais] P ON (C.Pais = P.ID)\
                            inner join [MaxTimeCHC].[dbo].[Ciudad] CIU on (CIU.ID = C.Ciudad)\
                            inner join [MaxTimeCHC].[dbo].[Analista] A on (RD.Analista = A.ID)\
                            WHERE YEAR(DRD.Fecha) = YEAR(getdate()) AND MONTH(DRD.Fecha) = MONTH(getdate())\
                            GROUP BY C.Nombre, A.Nombre, A.Cedula, C.HorasLaborales, p.ID, p.Nombre\
                            ) T\
                            LEFT join \
                            (SELECT P.id, COUNT(DNL.Dia) AS DiaNoLaboral FROM DiaNoLaboral DNL\
                            INNER JOIN DBO.Pais P ON (DNL.Pais = P.ID)\
                            WHERE YEAR(DNL.Fecha) = YEAR(getdate()) AND MONTH(DNL.Fecha) = MONTH(getdate()) AND DNL.Pais = P.ID\
                            GROUP BY P.id ) DBX on (DBX.ID = T.PaisID)\
                            ORDER BY T.Cliente,T.fecha"


};

module.exports = SQLQuery;

