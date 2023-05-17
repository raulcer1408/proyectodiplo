CREATE table Persona(
  cedula_identidad varchar(20) unique,
  nombre  varchar(40),
  primer_apellido varchar(40),
  segundo_apellido varchar(40),
  fecha_nacimiento date
);


select * from Persona;

insert into Persona(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values('6700155','Raul','Cervantes','','14/08/1990');
insert into Persona(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values('1281055','Vania','Torres','Urizar','08/03/2000');
insert into Persona(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values('6430123','Valeria','Torres','Sierra','08/12/1990');
insert into Persona(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values('27','Miguel','Velasquez','Quintanilla','27/02/1995');

update Persona set cedula_identidad='7400177' where cedula_identidad='27';

select cedula_identidad,nombre, age (fecha_nacimiento) from Persona group by cedula_identidad, nombre,fecha_nacimiento;
select ROUND(AVG(EXTRACT(YEAR FROM AGE(NOW(),fecha_nacimiento))))as promedio_edades from Persona;
select extract(year from AGE(NOW(),fecha_nacimiento))as edad from Persona;