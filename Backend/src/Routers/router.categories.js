import { Router } from "express";
import { get, create, getForId, update, alterEstadoId } from "../Controllers/controller.categories.js";
const routCategorie = Router();

routCategorie.get('/listar', get);
routCategorie.post('/crear', create);
routCategorie.get('/buscar/:id', getForId);
routCategorie.put('/actulizar/:id',update);

routCategorie.get('/alterEstado',alterEstadoId);

export default routCategorie;

