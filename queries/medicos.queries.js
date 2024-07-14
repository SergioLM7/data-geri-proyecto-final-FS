const queriesMedicos = {
    createMedico: `INSERT INTO medicos 
        (nombre_medico, apellido_medico, email, password_hash, id_colegiado, rol, is_active, is_logged, last_time_logged)
    VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    editRoleByAdmin:`UPDATE
        medicos
    SET 
        rol=$1
    WHERE 
        email=$2`,
    editPassword: `UPDATE
        medicos
    SET
        password_hash=$1
    WHERE 
        email=$2`,
    editLogged: `UPDATE
        medicos
    SET 
        is_logged=$1,
        last_time_logged=$2
    WHERE 
        email=$3`,
    deleteMedicoByAdmin: `UPDATE
        medicos
    SET 
        is_active=$1
    WHERE 
        email=$2`,
    getAllMedicos: `SELECT 
        *
    FROM 
        medicos
    ORDER BY 
        medico_id
    LIMIT $1 OFFSET $2;`,
    getMedicosByEmail: `SELECT
        *
    FROM medicos
    WHERE medicos.email=$1`
};

module.exports = queriesMedicos;
