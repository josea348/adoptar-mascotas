import { Router } from "express";
import { activar, create, desactivar, get, getForId, update } from "../Controllers/controller.users.js";
import { createUserValidation, updateUserValidation } from "../Validation/validar.user.js";
import { validarToken } from "../Controllers/autentication.js";
const routUsers = Router();

routUsers.get('/listar', get);
routUsers.post('/crear',createUserValidation, create);
routUsers.get('/buscar/:id', getForId);
routUsers.put('/actualizar/:id',updateUserValidation, update);
routUsers.patch('/desactivar/:id',desactivar);
routUsers.patch('/activar/:id',activar);

export default routUsers;