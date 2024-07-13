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
    nombre_paciente VARCHAR(50) NOT NULL,
    apellido_paciente VARCHAR(50) NOT NULL,
    sexo VARCHAR(7) NOT NULL,
    edad_paciente INT NOT NULL,
    fecha_ingreso DATE NOT NULL,
    fecha_alta DATE NOT NULL,
    edad_paciente INT NOT NULL,
    duracion_ingreso INTEGER GENERATED ALWAYS AS (
        DATE_PART('day', fecha_fin - fecha_inicio)
    ) STORED,
    diagnostico_principal VARCHAR(100) NOT NULL,
    barthel_basal INT NOT NULL
    FOREIGN KEY (medico_id)
);

/*Poblar tabla Médicos*/
INSERT INTO medicos (email, password_hash, first_name, last_name, role_id, is_active, is_logged, last_time_logged)
VALUES 
	('admin@admin.com', 'aasfsakfhashfkafhashfas', 'Luis', 'Acosta');

/*Poblar tabla ingresos*/
INSERT INTO ingresos (user_id, favorite_id)
VALUES
	(2, 'asfgh987832');