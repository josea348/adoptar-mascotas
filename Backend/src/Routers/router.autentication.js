import { Router } from "express";
import { login } from "../Controllers/autentication.js";
const routValidarUser = Router();

routValidarUser.post('/validarUser',login);

export default routValidarUser;