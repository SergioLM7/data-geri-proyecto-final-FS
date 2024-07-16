require('dotenv').config();
const {sequelize} = require('../config/db_sql');
const Medico = require('../schemas/medicos.schema');
const Ingreso = require('../schemas/medicos.schema');

const seedMedicos = async () => {
    try {
        await Medico.destroy(/* { truncate: { cascade: true } }*/);
        await Ingreso.destroy(/* { truncate: true } */);


        const medicosData = [
            {
                nombre_medico: 'Ana',
                apellido_medico: 'García',
                email: 'ana@madrid.com',
                password_hash: 'safasfasfa42',
                id_colegiado: 7890,
            },
            {
                nombre_medico: 'Maria',
                apellido_medico: 'Lopez',
                email: 'maria@sevilla.com',
                password_hash: 'paskjfha83',
                id_colegiado: 5678,
            },
            {
                nombre_medico: 'Carlos',
                apellido_medico: 'Hernandez',
                email: 'carlos@barcelona.com',
                password_hash: 'alkfj32jkl',
                id_colegiado: 9101,
                rol: 'admin',
            }
        ];

        // Insertar los registros en la tabla Medicos
        const medicos = await Medico.bulkCreate(medicosData);
        console.log("******", medicos)
        
        console.log('Registros de médicos insertados correctamente');
        return medicos;
    } catch (error) {
        console.error('Error al poblar la tabla de médicos', error);
    }
};



module.exports = seedMedicos;




/*const seedMedicos = async () => {
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

module.exports = seedMedicos;*/
