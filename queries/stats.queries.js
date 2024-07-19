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
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos`,
    statsGeneralesUltimosAnos: `SELECT 
		AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
	    SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
    FROM 
        ingresos
    WHERE 
        EXTRACT(YEAR FROM fecha_ingreso) IN ($1, $2, $3)
	GROUP BY
    	EXTRACT(YEAR FROM fecha_ingreso)
	ORDER BY
		EXTRACT(YEAR FROM fecha_ingreso) ASC;`,
    statsGeneralesAno: `SELECT 
        AVG(edad_paciente) AS edadMedia,
        AVG(duracion_ingreso) AS estanciaMedia,
        COUNT(ingreso_id) AS totalIngresos,
	    SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
        SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
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
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
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
        SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
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
            AVG(edad_paciente) AS edadMedia,
            AVG(duracion_ingreso) AS estanciaMedia,
            COUNT(ingreso_id) AS totalIngresos,
            SUM(CASE WHEN LOWER(sexo) = 'hombre' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeHombres,
            SUM(CASE WHEN LOWER(sexo) = 'mujer' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeMujeres,
            SUM(CASE WHEN LOWER(diagnostico_principal) = 'itu' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeITU,
            SUM(CASE WHEN LOWER(diagnostico_principal) = 'neumonia' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeNeumonia,
            SUM(CASE WHEN LOWER(diagnostico_principal) = 'icc' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeICC,
            SUM(CASE WHEN LOWER(diagnostico_principal) = 'Infeccion intraabd.' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeInfeccAbd,
            SUM(CASE WHEN LOWER(diagnostico_principal) = 'otro' THEN 1 ELSE 0 END) * 100.0 / COUNT(ingreso_id) AS porcentajeOtro
        FROM 
            ingresos AS ing
        WHERE
            ing.medico_id=(SELECT 
                    m.medico_id
                FROM 
                    medicos AS m
                WHERE 
                    m.email=$1)
        AND 
            EXTRACT(YEAR FROM fecha_ingreso) IN ($1, $2, $3)
	    GROUP BY
    	    EXTRACT(YEAR FROM fecha_ingreso)
	    ORDER BY
		    EXTRACT(YEAR FROM fecha_ingreso) ASC;`,
};

module.exports = queriesStats;
