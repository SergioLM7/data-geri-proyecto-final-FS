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
	(1, 4324, 'Josefa', 'Valcárcel', 'Mujer', 81, '2024/07/02','2024/07/03', 'itu', 2);


    INSERT INTO "ingresos" ("ingreso_id","historia_clinica","nombre_paciente","apellido_paciente","sexo","edad_paciente","fecha_ingreso","fecha_alta","duracion_ingreso","diagnostico_principal","barthel_basal") VALUES (DEFAULT,4324,'Josefa','Valcárcel','Mujer',81,'2024-07-01','2024-07-03',2,'ITU',2),(DEFAULT,4325,'Luis','Gomez','Hombre',72,'2024-07-02','2024-07-04',2,'neumonia',3),(DEFAULT,4326,'Ana','Perez','Mujer',75,'2024-07-03','2024-07-05',2,'ICC',4),(DEFAULT,4327,'Miguel','Martinez','Hombre',90,'2024-07-04','2024-07-06',2,'Infección intraabd.',5),(DEFAULT,4328,'Laura','Sanchez','Mujer',75,'2024-07-05','2024-07-07',2,'otro',2),(DEFAULT,4329,'Pedro','Fernandez','Hombre',77,'2024-07-06','2024-07-08',2,'ICC',1),(DEFAULT,4330,'Sofia','Lopez','Mujer',88,'2024-07-07','2024-07-09',2,'otro',3),(DEFAULT,4331,'Carlos','Diaz','Hombre',85,'2024-07-08','2024-07-10',2,'ITU',4),(DEFAULT,4332,'Marta','Garcia','Mujer',89,'2024-07-09','2024-07-11',2,'neumonia',5),(DEFAULT,4333,'Javier','Ramirez','Hombre',73,'2024-07-10','2024-07-12',2,'Infección intraabd.',2),(DEFAULT,4324,'Josefa','Valcárcel','Mujer',81,'2024-07-11','2024-07-13',2,'ITU',2),(DEFAULT,4325,'Luis','Gomez','Hombre',72,'2024-07-12','2024-07-14',2,'neumonia',3),(DEFAULT,4326,'Ana','Perez','Mujer',75,'2024-07-13','2024-07-15',2,'ICC',4),(DEFAULT,4327,'Miguel','Martinez','Hombre',90,'2024-07-14','2024-07-16',2,'Infección intraabd.',5),(DEFAULT,4328,'Laura','Sanchez','Mujer',75,'2024-07-15','2024-07-17',2,'otro',2),(DEFAULT,4329,'Pedro','Fernandez','Hombre',77,'2024-07-16','2024-07-18',2,'ICC',1),(DEFAULT,4330,'Sofia','Lopez','Mujer',88,'2024-07-17','2024-07-19',2,'otro',3),(DEFAULT,4331,'Carlos','Diaz','Hombre',85,'2024-07-18','2024-07-20',2,'ITU',4),(DEFAULT,4332,'Marta','Garcia','Mujer',89,'2024-07-19','2024-07-21',2,'neumonia',5),(DEFAULT,4333,'Javier','Ramirez','Hombre',73,'2024-07-20','2024-07-22',2,'Infección intraabd.',2),(DEFAULT,4324,'Josefa','Valcárcel','Mujer',81,'2024-07-21','2024-07-23',2,'ITU',2),(DEFAULT,4325,'Luis','Gomez','Hombre',72,'2024-07-22','2024-07-24',2,'neumonia',3),(DEFAULT,4326,'Ana','Perez','Mujer',75,'2024-07-23','2024-07-25',2,'ICC',4),(DEFAULT,4327,'Miguel','Martinez','Hombre',90,'2024-07-24','2024-07-26',2,'Infección intraabd.',5),(DEFAULT,4328,'Laura','Sanchez','Mujer',75,'2024-07-25','2024-07-27',2,'otro',2),(DEFAULT,4329,'Pedro','Fernandez','Hombre',77,'2024-07-26','2024-07-28',2,'ICC',1),(DEFAULT,4330,'Sofia','Lopez','Mujer',88,'2024-07-27','2024-07-29',2,'otro',3),(DEFAULT,4331,'Carlos','Diaz','Hombre',85,'2024-07-28','2024-07-30',2,'ITU',4),(DEFAULT,4332,'Marta','Garcia','Mujer',89,'2024-07-29','2024-07-31',2,'neumonia',5),(DEFAULT,4333,'Javier','Ramirez','Hombre',73,'2024-07-30','2024-08-01',2,'Infección intraabd.',2) RETURNING "ingreso_id","medico_id","historia_clinica","nombre_paciente","apellido_paciente","sexo","edad_paciente","fecha_ingreso","fecha_alta","duracion_ingreso","diagnostico_principal","barthel_basal";