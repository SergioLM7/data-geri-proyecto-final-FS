/*Crear tabla para los datos de los medicos/usuarios*/
CREATE TABLE medicos (
    medico_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    nombre_medico VARCHAR(50) NOT NULL,
    apellido_medico VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
   	id_colegiado INT NOT NULL UNIQUE,
    rol VARCHAR (20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_logged BOOLEAN NOT NULL,
    last_time_logged TIMESTAMP NOT NULL
);

/*Crear tabla user-favorites*/
CREATE TABLE ingresos (
    ingreso_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    medico_id INT NOT NULL,
    historia_clinica INT NOT NULL,
    nombre_paciente VARCHAR(50) NOT NULL,
    apellido_paciente VARCHAR(50) NOT NULL,
    sexo VARCHAR(7) NOT NULL,
    edad_paciente INT NOT NULL,
    fecha_ingreso DATE NOT NULL,
    fecha_alta DATE NOT NULL,
    duracion_ingreso INTEGER GENERATED ALWAYS AS (
        CASE WHEN fecha_alta >= fecha_ingreso THEN
            (fecha_alta - fecha_ingreso)
        ELSE
            NULL
        END
    ) STORED,
    diagnostico_principal VARCHAR(100) NOT NULL,
    barthel_basal INT NOT NULL,
    FOREIGN KEY (medico_id) REFERENCES medicos(medico_id),
    CONSTRAINT unique_historia_paciente UNIQUE (historia_clinica, nombre_paciente, apellido_paciente, fecha_ingreso)
);

/*Poblar tabla Médicos*/
INSERT INTO medicos (nombre_medico, apellido_medico, email, password_hash, id_colegiado, rol, is_active, is_logged, last_time_logged)
VALUES 
	('Julio', 'Salinas', 'julio@madrid.com', 'saafasfassa98', '1234', 'user', true, false, '2024/07/01 21:00:00');

/*Poblar tabla ingresos*/
INSERT INTO ingresos (medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal)
VALUES
	(1, 4324, 'Josefa', 'Valcárcel', 'Mujer', 81, '2024/07/02','2024/07/03', 'catarro', 2);