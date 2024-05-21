import { pool } from "../Databases/coexion.js";

export const get = async (req, res) => {
  try {
    let sql = `SELECT * FROM categories`;
    const [categories] = await pool.query(sql);
    if (categories.length > 0) {
      res.status(200).json(categories);
      console.log(categories);
    } else {
      res.status(404).json({ message: "No existen categorias en la base de datos." });
      console.log("No existen categorias en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const create = async (req, res) => {
  try {
    const { categoria } = req.body;
    let sql = `INSERT INTO categories(nameCategories) VALUES ('${categoria}')`;
    const [categories] = await pool.query(sql);
    if (categories.affectedRows > 0) {
      res.status(200).json({ message: "categoria registrado exitosamente." });
    } else {
      res.status(404).json({ message: "No se registrado el categoria en la base de datos." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getForId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT * FROM categories WHERE idCategories = ${id}`;
    const [categories] = await pool.query(sql);
    if (categories.length > 0) {
      res.status(200).json(categories);
      console.log(categories);
    } else {
      res.status(404).json({ message: `No se encontro categoria con el id ${id}.` });
      console.log(`No se encontro categoria con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;
    let sql = `UPDATE categories SET nameCategories='${categoria}' WHERE idCategories='${id}'`;
    const [categories] = await pool.query(sql);
    if (categories.affectedRows > 0) {
      res.status(200).json({ message: "categoria actualizado exitosamente." });
    } else {
      res.status(404).json({ message: `No se actualizo la categoria con el id ${id}.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const alterEstadoId = async (req, res) => {
  try {
    let sql = `ALTER TABLE categories ADD COLUMN estado ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo'`;
    const [categories] = await pool.query(sql);
    if (categories.length > 0) {
      res.status(200).json({message: 'Se añadio la columna estado a la tabla categories.'});
      console.log(categories);
    } else {
      res.status(404).json({ message: "No se añadio la columna estado a la tabla categories." });
      console.log("No se añadio la columna estado a la tabla categories.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}