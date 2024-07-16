require('dotenv').config();
const { sequelize } = require('../config/db_sql');
const Ingreso = require('../schemas/ingresos.schema');

const seedIngresos = async () => {
    try {
        // await sequelize.authenticate();
        // console.log('Conexión a la base de datos establecida con éxito.');

        //const medicosData = await medicos.findAll();

        const medicos = [
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
        console.log("*******", medicos);

        // Inicia una transacción
        const transaction = await sequelize.transaction();

        try {
            // Poblar la tabla ingresos con 10 ingresos por cada medico
            const historias = [4324, 4325, 4326, 4327, 4328, 4329, 4330, 4331, 4332, 4333];
            const nombresPacientes = ['Josefa', 'Luis', 'Ana', 'Miguel', 'Laura', 'Pedro', 'Sofia', 'Carlos', 'Marta', 'Javier'];
            const apellidosPacientes = ['Valcárcel', 'Gomez', 'Perez', 'Martinez', 'Sanchez', 'Fernandez', 'Lopez', 'Diaz', 'Garcia', 'Ramirez'];
            const sexos = ['Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre'];
            const edades = [81, 72, 75, 90, 75, 77, 88, 85, 89, 73];
            const diagnosticos = ['ITU', 'neumonia', 'ICC', 'Infección intraabd.', 'otro', 'ICC', 'otro', 'ITU', 'neumonia', 'Infección intraabd.'];
            const barthel = [2, 3, 4, 5, 2, 1, 3, 4, 5, 2];
            let currentDate = new Date('2024-07-01');

            const ingresosBulkData = [];

            for (const medico of medicos) {
                for (let i = 0; i < 10; i++) {
                    const fechaIngreso = new Date(currentDate);
                    const fechaAlta = new Date(currentDate);
                    fechaAlta.setDate(fechaAlta.getDate() + 2);
                    const duracionIngreso = Math.floor((fechaAlta - fechaIngreso) / (1000 * 60 * 60 * 24));

                    ingresosBulkData.push({
                        medico_id: Math.floor(Math.random() * 3) + 1,
                        historia_clinica: historias[i],
                        nombre_paciente: nombresPacientes[i],
                        apellido_paciente: apellidosPacientes[i],
                        sexo: sexos[i],
                        edad_paciente: edades[i],
                        fecha_ingreso: fechaIngreso.toISOString().split('T')[0],
                        fecha_alta: fechaAlta.toISOString().split('T')[0],
                        duracion_ingreso: duracionIngreso,
                        diagnostico_principal: diagnosticos[i],
                        barthel_basal: barthel[i]
                    });

                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }

            // Insertar todos los registros de ingresos utilizando bulkCreate
            await Ingreso.bulkCreate(ingresosBulkData, { transaction });

            // Confirmar la transacción
            await transaction.commit();
            console.log('Tabla ingresos poblada exitosamente');
        } catch (error) {
            // Revertir la transacción en caso de error
            await transaction.rollback();
            console.error('Error al poblar la tabla ingresos', error);
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};

module.exports = seedIngresos;




/*const seedIngresos = async (medicos) => {
    try {
        // Conecta a la base de datos
        const client = await db.getClient();
        

        try {
            // Inicia una transacción

            await client.query('BEGIN');
            //Ingresos.query...
           

           

            // Poblar la tabla ingresos con 10 ingresos por cada medico
            const ingresosValues = [];
            const historias = [4324, 4325, 4326, 4327, 4328, 4329, 4330, 4331, 4332, 4333];
            const nombresPacientes = ['Josefa', 'Luis', 'Ana', 'Miguel', 'Laura', 'Pedro', 'Sofia', 'Carlos', 'Marta', 'Javier'];
            const apellidosPacientes = ['Valcárcel', 'Gomez', 'Perez', 'Martinez', 'Sanchez', 'Fernandez', 'Lopez', 'Diaz', 'Garcia', 'Ramirez'];
            const sexos = ['Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre', 'Mujer', 'Hombre'];
            const edades = [81, 72, 75, 90, 75, 77, 88, 85, 89, 73];
            const diagnosticos = ['ITU', 'neumonia', 'ICC', 'Infección intraabd.', 'otro', 'ICC', 'otro', 'ITU', 'neumonia', 'Infección intraabd.'];
            const barthel = [2, 3, 4, 5, 2, 1, 3, 4, 5, 2];
            let currentDate = new Date('2024-07-01');

            for (const medico of medicos) {
                for (let i = 0; i < 10; i++) {
                    const fechaIngreso = new Date(currentDate);
                    const fechaAlta = new Date(currentDate);
                    fechaAlta.setDate(fechaAlta.getDate() + 2); 

                    ingresosValues.push(`(${medico.medico_id}, ${historias[i]}, '${nombresPacientes[i]}', '${apellidosPacientes[i]}', '${sexos[i]}', ${edades[i]}, '${fechaIngreso.toISOString().split('T')[0]}', '${fechaAlta.toISOString().split('T')[0]}', '${diagnosticos[i]}', ${barthel[i]})`);

                    currentDate.setDate(currentDate.getDate() + 1); 
                }
            }

            const ingresosQuery = `
                INSERT INTO ingresos (medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal) VALUES
                ${ingresosValues.join(', ')};
            `;
             //alternativa
             //Ingresos.bulkCreate(ingresosQuery)

            await client.query(ingresosQuery);
            //Ingresos.query(...)

            // Confirma la transacción
            await client.query('COMMIT');
            //Ingresos.query(...)
            console.log('Tabla ingresos poblada exitosamente');
        } catch (error) {
            // Revertir la transacción en caso de error
            await client.query('ROLLBACK');
            console.error('Error al poblar la tabla ingresos', error);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};*/

