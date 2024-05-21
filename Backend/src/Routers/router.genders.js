import { Router } from "express";
import { alterEstadoId, borrar, create, get, getForId } from "../Controllers/controller.genders.js";
const routGenders = Router();

routGenders.get('/listar', get);
routGenders.post('/crear', create);
routGenders.get('/buscar/:id', getForId);
routGenders.delete('/borrar/:id',borrar);

routGenders.get('/alterEstado',alterEstadoId);

export default routGenders;

