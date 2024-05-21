import { pool } from "../Databases/coexion.js";
import { validationResult } from "express-validator";
import bycript from "bcrypt";

export const get = async (req, res) => {
  try {
    let sql = `SELECT * FROM users`;
    const [users] = await pool.query(sql);
    if (users.length > 0) {
      res.status(200).json(users);
      console.log(users);
    } else {
      res.status(404).json({ message: "No existen usuarios en la base de datos." });
      console.log("No existen usuarios en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  try {
    const { name, email, password } = req.body;
    const hashePassword = await bycript.hash(password, 10);
    let sql = `INSERT INTO users(fullname, email, password) VALUES ('${name}', '${email}', '${hashePassword}')`;
    const [users] = await pool.query(sql);
    if (users.affectedRows > 0) {
      res.status(200).json({ message: "Usuario registrado exitosamente." });
    } else {
      res.status(404).json({ message: "No se registrado el usuario en la base de datos." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getForId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT * FROM users WHERE id = ${id}`;
    const [users] = await pool.query(sql);
    if (users.length > 0) {
      res.status(200).json(users);
      console.log(users);
    } else {
      res.status(404).json({ message: `No existen usuarios  con el id ${id}.` });
      console.log(`No existen usuarios  con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashePassword = await bycript.hashSync(password, 10);
    console.log(hashePassword);
    let sql = `UPDATE users SET fullname='${name}', email='${email}', password='${hashePassword}' WHERE id='${id}'`;
    const [users] = await pool.query(sql);
    if (users.affectedRows > 0) {
      res.status(200).json({ message: `Se actualizo el usuario con el id ${id} exitosamente.` });
    } else {
      res.status(404).json({ message: `No se actualizo el usuario con el id ${id}.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const borrar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE FROM users WHERE id = ${id}`;
    const [users] = await pool.query(sql);
    if (users.length > 0) {
      res.status(200).json({message: `Se elimino la mascota con el id ${id}.`});
    } else {
      res.status(404).json({ message: `No existe mascota con el id ${id}.` });
      console.log(`No existen genero con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const alterEstadoId = async (req, res) => {
  try {
    let sql = `ALTER TABLE users ADD COLUMN estado ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo'`;
    const [users] = await pool.query(sql);
    if (users.length > 0) {
      res.status(200).json({message: 'Se añadio la columna estado a la tabla users.'});
      console.log(users);
    } else {
      res.status(404).json({ message: "No se añadio la columna estado a la tabla users." });
      console.log("No se añadio la columna estado a la tabla users.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}