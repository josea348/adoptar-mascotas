import { pool } from "../Databases/coexion.js";
import multer from "multer";
import { validationResult } from "express-validator";

const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }
);

const upload = multer({ storage: storage });
export const cargarImagen = upload.single('imagen');

export const get = async (req, res) => {
  try {
    let sql = `SELECT * FROM pets`;
    const [pets] = await pool.query(sql);
    if (pets.length > 0) {
      res.status(200).json(pets);
      console.log(pets);
    } else {
      res.status(404).json({ message: "No existen mascotas en la base de datos." });
      console.log("No existen mascotas en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getName = async (req, res) => {
  try {
    let sql = `SELECT idPets,namePets,nameRaces,nameCategories,photo,nameGender,fullname,pets.estado FROM pets
              JOIN races ON idRaces = race_id
              JOIN categories ON idCategories = category_id
              JOIN genders ON idGender = gender_id
              JOIN users ON id = user_id`;
    const [pets] = await pool.query(sql);
    if (pets.length > 0) {
      res.status(200).json(pets);
      console.log(pets);
    } else {
      res.status(404).json({ message: "No existen mascotas en la base de datos." });
      console.log("No existen mascotas en la base de datos.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const create = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json(errors);
  }

  try {
    const { nombre, raza, categoria, genero, iduser } = req.body;
    let imagen = req.file.filename;
    let sql = `INSERT INTO pets(namePets, race_id, category_id, photo, gender_id, user_id) VALUES ('${nombre}','${raza}', '${categoria}', '${imagen}', '${genero}','${iduser}')`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({ message: "mascota registrado exitosamente." });
    } else {
      res.status(404).json({ message: "No se registrado la mascota en la base de datos." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getForId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT * FROM pets WHERE idPets = ${id}`;
    const [pets] = await pool.query(sql);
    if (pets.length > 0) {
      res.status(200).json(pets);
      console.log(pets);
    } else {
      res.status(404).json({ message: `No existen mascota con el id ${id}.` });
      console.log(`No existen mascota con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, raza, categoria, genero } = req.body;
    let imagen = req.file.filename;
    let sql = `UPDATE pets SET namePets='${nombre}', race_id=${raza}, category_id=${categoria}, photo='${imagen}', gender_id=${genero} WHERE idPets=${id}`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({ message: `Se actualizo la mascota con el id ${id} exitosamente.` });
    } else {
      res.status(404).json({ message: `No se actualizo la mascota con el id ${id}.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const borrar = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE FROM pets WHERE idPets = ${id}`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({message: `Se elimino la mascota con el id ${id}.`});
    } else {
      res.status(404).json({ message: `No existe mascota con el id ${id}.` });
      console.log(`No existen genero con el id ${id}.`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const alterUserId = async (req, res) => {
  try {
    let sql = `ALTER TABLE pets ADD COLUMN user_id INT NOT NULL`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({message: 'Se añadio la columna user_id a la tabla pets.'});
      console.log(pets);
    } else {
      res.status(404).json({ message: "No se añadio la columna user_id a la tabla pets." });
      console.log("No se añadio la columna user_id a la tabla pets.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const alterEstadoId = async (req, res) => {
  try {
    let sql = `ALTER TABLE pets ADD COLUMN estado ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo'`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({message: 'Se añadio la columna estado a la tabla pets.'});
      console.log(pets);
    } else {
      res.status(404).json({ message: "No se añadio la columna estado a la tabla pets." });
      console.log("No se añadio la columna estado a la tabla pets.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const alterRelacion = async (req, res) => {
  try {
    let sql = `ALTER TABLE pets ADD CONSTRAINT regiftrar FOREIGN KEY(user_id) REFERENCES users(id)`;
    const [pets] = await pool.query(sql);
    if (pets.affectedRows > 0) {
      res.status(200).json({message: 'Se hizo la relacin a la tabla pets con la tabla user.'});
      console.log(pets);
    } else {
      res.status(404).json({ message: "No se hizo la relacin a la tabla pets con la tabla user." });
      console.log("No se hizo la relacin a la tabla pets con la tabla user.");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}


// ALTER TABLE pets ADD CONSTRAINT regiftrar FOREIGN KEY(user_id) REFERENCES users(id);
// ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`petfinder`.`#sql-1990_88`, CONSTRAINT `regiftrar` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))
