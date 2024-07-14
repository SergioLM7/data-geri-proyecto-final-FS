const queriesIngresos = {
    createIngreso: `INSERT INTO ingresos
        (medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal)
    VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    editIngreso:`UPDATE
        ingresos
    SET 
        medico_id=$2,
        historia_clinica=$3,
        nombre_paciente=$4,
        apellido_paciente=$5,
        sexo=$6,
        edad_paciente=$7,
        fecha_ingreso=$8,
        fecha_alta=$9,
        diagnostico_principal=$10, 
        barthel_basal=$11
    WHERE 
        ingreso_id=$1`,
    deleteIngreso: `DELETE FROM
        ingresos
    WHERE 
        ingreso_id=$1`,
    getIngresosByMedico: `SELECT
        *
    FROM 
        ingresos as ing
    WHERE 
        ing.medico_id=(SELECT 
                m.medico_id
            FROM 
                medicos AS m
            WHERE m.email=$1)
    ORDER BY 
        ing.fecha_ingreso DESC
    LIMIT 10 OFFSET $2;`,
    getIngresosByHistoria: `SELECT
        *
    FROM ingresos
    WHERE ingresos.historia_clinica=$1
    LIMIT 10 OFFSET $2;`
};

module.exports = queriesIngresos;
