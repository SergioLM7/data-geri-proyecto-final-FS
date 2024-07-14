const db = require('../config/db_sql');

const seedMedicos = async () => {
    try {
        //Conecta con la base de datos
        const client = await db.getClient();

        try {
            // Inicia una transacción
            await client.query('BEGIN');

            await client.query('DELETE FROM ingresos');
            await client.query('DELETE FROM medicos');


            //Poblar la tabla médicos
            const medicosResult = await client.query(`
                INSERT INTO medicos (nombre_medico, apellido_medico, email, password_hash, id_colegiado, rol, is_active, is_logged, last_time_logged) VALUES
                ('Ana', 'García', 'ana@madrid.com', 'safasfasfa42', '7890', 'user', true, false, '2024-07-01 21:00:00'),
                ('Maria', 'Lopez', 'maria@sevilla.com', 'paskjfha83', '5678', 'user', true, false, '2024-07-01 22:00:00'),
                ('Carlos', 'Hernandez', 'carlos@barcelona.com', 'alkfj32jkl', '9101', 'admin', true, false, '2024-06-01 23:00:00')
                 RETURNING medico_id;
            `);

            //Confirma la transacción
            await client.query('COMMIT');
            console.log('La tabla médicos ha sido poblada exitosamente');
            return medicosResult.rows;

        } catch (error) {
            //Revierte la transacción en caso de error
            await client.query('ROLLBACK');
            console.error('Error al poblar la tabla médicos', error);
        } finally {
            //Libera el cliente
            client.release();
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};

module.exports = seedMedicos;
