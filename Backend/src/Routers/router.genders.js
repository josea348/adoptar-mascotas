import { Router } from "express";
import { activar, borrar, create, desactivar, get, getForId } from "../Controllers/controller.genders.js";
const routGenders = Router();

routGenders.get('/listar', get);
routGenders.post('/crear', create);
routGenders.get('/buscar/:id', getForId);
routGenders.delete('/borrar/:id',borrar);
routGenders.patch('/desactivar/:id',desactivar);
routGenders.patch('/activar/:id',activar);

export default routGenders;

