import { Router } from "express";
import { get, create, getForId, alterEstadoId } from "../Controllers/controller.races.js";
const routRaces = Router();

routRaces.get('/listar', get);
routRaces.post('/crear', create);
routRaces.get('/buscar/:id', getForId);

routRaces.get('/alterEstado',alterEstadoId)

export default routRaces;

