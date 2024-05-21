import { Router } from "express";
import { alterEstadoId, create, get, getForId, update } from "../Controllers/controller.users.js";
import { createUserValidation, updateUserValidation } from "../Validation/validar.user.js";
const routUsers = Router();

routUsers.get('/listar', get);
routUsers.post('/crear',createUserValidation, create);
routUsers.get('/buscar/:id', getForId);
routUsers.put('/actualizar/:id',updateUserValidation, update);

routUsers.get('/alterEstado',alterEstadoId)

export default routUsers;