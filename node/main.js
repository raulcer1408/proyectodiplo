const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "API_PROYECTO",
  password: "root",
  port: "5432",
});

// Modelo
class Model {
  async getUsuarios() {
    const { rows } = await pool.query("select* from persona;");
    return rows;
  }

  async getUsuarioId(ci) {
    const { rows } = await pool.query("select* from persona where cedula_identidad = $1 ;", [ci]);
    return rows[0];
  }
  async addUsuario(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento) {
    //await pool.query("INSERT INTO persona () values ($1)", [name]);
    await pool.query("insert into persona(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values($1,$2,$3,$4,$5)",[cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento]);
  }

  async updateUsuario(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento) {
    await pool.query("UPDATE persona SET nombre = $2, primer_apellido = $3, segundo_apellido=$4, fecha_nacimiento=$5 WHERE cedula_identidad = $1", [cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento]);
  }

  async deleteUsuario(cedula_identidad) {
    await pool.query("DELETE FROM persona WHERE cedula_identidad = $1", [cedula_identidad]);
  }
  async promedioEdadUsuario(){
    //console.log('entro avg');
    const { rows }=await pool.query("select ROUND(AVG(EXTRACT(YEAR FROM AGE(NOW(),fecha_nacimiento))))as promedio_Edad from persona;");
    return rows[0];
  }
}

//Controlador
class Controller {
  constructor(model) {
    this.model = model;
  }

  async getPersona(req, res) {
    const data = await this.model.getUsuarios();
    res.send(data);
  }

  async getPersonaById(req, res) {
    const id = req.params.id_usuario;
    const data = await this.model.getUsuarioId(id);
    res.send(data);
  }

  async addusuario(req, res) {
    const cedula_identidad = req.body.cedula_identidad;
    const nombre=req.body.nombre;
    const primer_apellido=req.body.primer_apellido;
    const segundo_apellido=req.body.segundo_apellido;
    const fecha_nacimiento=req.body.fecha_nacimiento;
    await this.model.addUsuario(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento);
    res.sendStatus(201);
  }

  async updateUsuario(req, res) {
    const cedula_identidad = req.params.id_usuario;
    const nombre=req.body.name;
    const primer_apellido=req.body.primer_apellido;
    const segundo_apellido=req.body.segundo_apellido;
    const fecha_nacimiento=req.body.fecha_nacimiento;
    await this.model.updateUsuario(cedula_identidad, nombre, primer_apellido,segundo_apellido,fecha_nacimiento);
    res.sendStatus(200);
  }

  async deleteUsuario(req, res) {
    const cedula_identidad = req.params.id_usuario;
    await this.model.deleteUsuario(cedula_identidad);
    res.sendStatus(200);
  }
  async getpromedioedad(req, res) {
    //console.log('entro al promedio de edad');
    const data = await this.model.promedioEdadUsuario();
    res.send(data);
  }
}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getPersona.bind(controller));
//se hace notar que se vio necesario crear el promedio-edad  antes de crear el endpoint con id:usuario ya que reconocia primero ese endpoint y no permitia  buscar el promedio porque tomaba en cuenta y ejecutaba el primer endpoint
app.get('/usuarios/promedio-edad/', controller.getpromedioedad.bind(controller));
//
app.get("/usuarios/:id_usuario", controller.getPersonaById.bind(controller));
app.post("/usuarios/", controller.addusuario.bind(controller));
//app.put("/usuarios/:cedula_identidad,:name,:primer_apellido,:segundo_apellido", controller.updateUsuario.bind(controller));
app.put("/usuarios/:id_usuario", controller.updateUsuario.bind(controller));
app.delete("/usuarios/:id_usuario", controller.deleteUsuario.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});