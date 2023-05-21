El proyecto esta elaborado en una base de datos PostgresSql con el nombre API_PROYECTO
create DATABASE API_PROYECTO;
EL MISMO TIENE UNA TABLA
CREATE table Persona(
  cedula_identidad varchar(20) unique,
  nombre  varchar(40),
  primer_apellido varchar(40),
  segundo_apellido varchar(40),
  fecha_nacimiento date
);
DESPUES SE REALIZA LA CREACION DE LA API EN main.js utilizando express
