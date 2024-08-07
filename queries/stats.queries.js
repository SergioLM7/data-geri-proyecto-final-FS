const queriesStats = {
    statsGenerales: `SELECT 
        AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
	    SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos`,
    statsGeneralesUltimosAnos: `SELECT 
    year_data.ano,
    AVG(edad_paciente) AS edadMedia,
    AVG(duracion_ingreso) AS estanciaMedia,
    COUNT(ingreso_id) AS totalIngresos,
    COALESCE(SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeHombres,
    COALESCE(SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeMujeres,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeITU,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeNeumonia,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeICC,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeInfeccAbd,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeOtro
FROM 
    (
        SELECT 2022 AS ano
        UNION ALL
        SELECT 2023
        UNION ALL
        SELECT 2024
    ) AS year_data
LEFT JOIN 
    ingresos AS ing ON EXTRACT(YEAR FROM ing.fecha_ingreso) = year_data.ano
GROUP BY
    year_data.ano
ORDER BY
    year_data.ano ASC;`,
    statsGeneralesAno: `SELECT 
        AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
	    SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos
    WHERE 
        EXTRACT(YEAR FROM fecha_ingreso) = $1`,
    statsGeneralesMedico: `SELECT 
        AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
        SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos AS ing
    WHERE
        ing.medico_id=(SELECT 
                m.medico_id
            FROM 
                medicos AS m
            WHERE 
                m.email= :email)`,
    statsGeneralesMedicoAno: `SELECT 
        AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
        SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos AS ing
    WHERE
        ing.medico_id=(SELECT 
                m.medico_id
            FROM 
                medicos AS m
            WHERE 
                m.email= :email)
            AND  
                EXTRACT(YEAR FROM fecha_ingreso) = :ano;`,
    statsGeneralesMedicoUltimosAnos: `SELECT 
    year_data.ano,
    AVG(edad_paciente) AS edadMedia,
    AVG(duracion_ingreso) AS estanciaMedia,
    COUNT(ingreso_id) AS totalIngresos,
    COALESCE(SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeHombres,
    COALESCE(SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeMujeres,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeITU,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeNeumonia,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeICC,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeInfeccAbd,
    COALESCE(SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(ingreso_id), 0), 0) AS porcentajeOtro
FROM 
    (
        SELECT 2022 AS ano
        UNION ALL
        SELECT 2023
        UNION ALL
        SELECT 2024
    ) AS year_data
LEFT JOIN 
    ingresos AS ing ON EXTRACT(YEAR FROM ing.fecha_ingreso) = year_data.ano
AND 
    ing.medico_id = (
        SELECT 
            m.medico_id
        FROM 
            medicos AS m
        WHERE 
            m.email = :email
    )
GROUP BY
    year_data.ano
ORDER BY
    year_data.ano ASC;`,
};

module.exports = queriesStats;
