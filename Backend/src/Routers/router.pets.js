import { Router } from "express";
import { get, create, getForId, cargarImagen, update, getName, borrar, desactivar, activar } from "../Controllers/controller.pets.js";
import { createPetValidation, updatePetValidation } from "../Validation/validar.pets.js";
import { validarToken } from "../Controllers/autentication.js";
const routPets = Router();

routPets.get('/listar', get);
routPets.get('/listarNombre',getName);
routPets.post('/crear',createPetValidation,cargarImagen,create);
routPets.get('/buscar/:id', getForId);
routPets.put('/actualizar/:id',validarToken,updatePetValidation,cargarImagen,update);
routPets.delete('/borrar/:id',borrar);
routPets.patch('/desactivar/:id',desactivar);
routPets.patch('/activar/:id',activar);

export default routPets;
