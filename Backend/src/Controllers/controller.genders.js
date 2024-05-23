import { pool } from "../Databases/coexion.js";

export const get = async (req, res) => {
  try {
    let sql = `SELECT * FROM genders`;
    const [genders] = await pool.query(sql);
    if (genders.length > 0) {
      res.status(200).json(genders);
      console.log(genders);
    } else {
      res.status(404).json({ message: "No existen generos en la base de datos." });
      console.log("No existen generos en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const create = async (req, res) => {
  try {
    const { genero } = req.body;
    let sql = `INSERT INTO genders(nameGender) VALUES ('${genero}')`;
    const [genders] = await pool.query(sql);
    if (genders.affectedRows > 0) {
      res.status(200).json({ message: "genero registrado exitosamente." });
    } else {
      res.status(404).json({ message: "No se registrado el genero en la base de datos." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getForId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT * FROM genders WHERE idGender = ${id}`;
    const [genders] = await pool.query(sql);
    if (genders.length > 0) {
      res.status(200).json(genders);
      console.log(genders);
    } else {
      res.status(404).json({ message: `No existen genero con el id ${id}.` });
      console.log(`No existen genero con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const borrar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE FROM genders WHERE idGender = ${id}`;
    const [genders] = await pool.query(sql);
    if (genders.length > 0) {
      res.status(200).json(genders);
      console.log(genders);
    } else {
      res.status(404).json({ message: `No existen genero con el id ${id}.` });
      console.log(`No existen genero con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const desactivar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `UPDATE genders SET estado = 1 WHERE idGender='${id}'`;
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
    let sql = `UPDATE genders SET estado=2 WHERE idGender='${id}'`;
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