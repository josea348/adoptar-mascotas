import { check, param } from "express-validator";

export const createUserValidation = [
  check('name', 'El nombre es obligatorio o maximo 50 caracteres').notEmpty().isString().isLength({max:50}),
  check('email', 'Es necesario el correo').isEmail(),
  check('password', 'La contraseña es necesaria, entre 6 a 10 digitos').isLength({ min: 6, max: 10 }),
];

export const updateUserValidation = [
  param('id').isInt().toInt(),
  check('name', 'El nombre es obligatorio o maximo 50 caracteres').optional().isString().isLength({max: 50}),
  check('email', 'Es necesario el correo').optional().isEmail(),
  check('password', 'La contraseña es necesaria, entre 6 a 10 digitos').optional().isLength({ min: 6, max: 10 }),
];
