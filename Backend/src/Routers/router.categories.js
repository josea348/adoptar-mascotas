import { Router } from "express";
import { get, create, getForId, update, desactivar, activar } from "../Controllers/controller.categories.js";
const routCategorie = Router();

routCategorie.get('/listar', get);
routCategorie.post('/crear', create);
routCategorie.get('/buscar/:id', getForId);
routCategorie.put('/actulizar/:id',update);
routCategorie.patch('/desactivar/:id',desactivar);
routCategorie.patch('/activar/:id',activar);

export default routCategorie;

