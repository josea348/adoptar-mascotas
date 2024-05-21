import { Router } from "express";
import { get, create, getForId, cargarImagen, update, getName, borrar, alterUserId, alterEstadoId, alterRelacion } from "../Controllers/controller.pets.js";
import { createPetValidation, updatePetValidation } from "../Validation/validar.pets.js";
import { validarToken } from "../Controllers/autentication.js";
const routPets = Router();

routPets.get('/listar', get);
routPets.get('/listarNombre',getName);
routPets.post('/crear',validarToken,createPetValidation,cargarImagen,create);
routPets.get('/buscar/:id', getForId);
routPets.put('/actualizar/:id',validarToken,updatePetValidation,cargarImagen,update);
routPets.delete('/borrar/:id',borrar);

routPets.get('/alterUser',alterUserId);
routPets.get('/alterEstado',alterEstadoId);
routPets.get('/alterRelacion',alterRelacion);


export default routPets;
