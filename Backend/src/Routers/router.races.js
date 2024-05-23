import { Router } from "express";
import { get, create, getForId, desactivar, activar } from "../Controllers/controller.races.js";
const routRaces = Router();

routRaces.get('/listar', get);
routRaces.post('/crear', create);
routRaces.get('/buscar/:id', getForId);
routRaces.patch('/desactivar/:id',desactivar);
routRaces.patch('/activar/:id',activar);

export default routRaces;

