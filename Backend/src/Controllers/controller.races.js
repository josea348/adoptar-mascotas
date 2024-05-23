import { pool } from "../Databases/coexion.js";

export const get = async (req, res) => {
  try {
    let sql = `SELECT * FROM races`;
    const [races] = await pool.query(sql);
    if (races.length > 0) {
      res.status(200).json(races);
      console.log(races);
    } else {
      res.status(404).json({ message: "No existen razas en la base de datos." });
      console.log("No existen razas en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const create = async (req, res) => {
  try {
    const { raza } = req.body;
    let sql = `INSERT INTO races(nameRaces) VALUES ('${raza}')`;
    const [races] = await pool.query(sql);
    if (races.affectedRows > 0) {
      res.status(200).json({ message: "raza registrado exitosamente." });
    } else {
      res.status(404).json({ message: "No se registrado el raza en la base de datos." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getForId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT * FROM races WHERE idRaces = ${id}`;
    const [races] = await pool.query(sql);
    if (races.length > 0) {
      res.status(200).json(races);
      console.log(races);
    } else {
      res.status(404).json({ message: `No existen raza con el id ${id}.` });
      console.log(`No existen raza con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const desactivar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `UPDATE races SET estado = 1 WHERE idRaces='${id}'`;
    const [genders] = await pool.query(sql);
    if (genders.affectedRows > 0) {
      res.status(200).json({ message: "El genero se desactivo exitosamente del id "+id+"."  });
    } else {
      res.status(404).json({ message: `No se desactivo la genero con el id ${id}.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const activar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `UPDATE races SET estado=2 WHERE idRaces='${id}'`;
    const [genders] = await pool.query(sql);
    if (genders.affectedRows > 0) {
      res.status(200).json({ message: "El genero se activo exitosamente del id "+id+"."  });
    } else {
      res.status(404).json({ message: `No se activo la genero con el id ${id}.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}