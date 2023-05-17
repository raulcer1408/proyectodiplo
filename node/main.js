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
    await pool.query("UPDATE persona SET nombre = $2, SET primer_apellido = $3, SET segundo_apellido=$4, fecha_nacimiento=$5= WHERE cedula_identidad = $1", [cedula_identidad,primer_apellido,segundo_apellido,fecha_nacimiento]);
  }

  async deleteItem(cedula_identidad) {
    await pool.query("DELETE FROM persona WHERE id = $1", [cedula_identidad]);
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
    const id = req.params.ci;
    const data = await this.model.getUsuarioId(id);
    res.send(data);
  }

  async addItem(req, res) {
    const name = req.body.name;
    await this.model.addItem(name);
    res.sendStatus(201);
  }

  async updateItem(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    await this.model.updateItem(id, name);
    res.sendStatus(200);
  }

  async deleteItem(req, res) {
    const id = req.params.id;
    await this.model.deleteItem(id);
    res.sendStatus(200);
  }
}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getPersona.bind(controller));
app.get("/usuarios/:ci", controller.getPersonaById.bind(controller));
/*app.post("/items", controller.addItem.bind(controller));
app.put("/items/:id", controller.updateItem.bind(controller));
app.delete("/items/:id", controller.deleteItem.bind(controller));*/

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});